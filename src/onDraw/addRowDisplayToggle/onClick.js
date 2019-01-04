import customizeRows from '../customizeRows';
import customizeCells from '../customizeCells';
import flagParentRows from '../flagParentRows';

export default function onClick(d, chart) {
    var row = d3.select(this);

    var collapsed = !row.classed('chm-table-row--collapsed');

    // ensure that you don't collapse an already collapsed row or expand an already expanded one
    row
        .classed('chm-table-row--collapsed', collapsed) //toggle the class
        .classed('chm-table-row--expanded', !collapsed); //toggle the class

    // subset the nested child dictionary to create an object with only the ids for the children of the current row
    var currentNest = chart.childNest;
    d.id.split('  |').forEach(function(level) {
        currentNest = currentNest[level];
    });

    var childIds;
    // when collapsing, if the nest's children have children, loop through and build array with those ids included
    if (collapsed && Object.keys(currentNest).length > 1) {
        childIds = [];
        Object.keys(currentNest).forEach(function(level) {
            Object.values(currentNest[level]).length > 1 // handle different strctures
                ? (childIds = childIds.concat(Object.values(currentNest[level])))
                : (childIds = childIds.concat(Object.values(currentNest[level])[0]));
        });
    } else {
        childIds = currentNest.ids;
    }

    if (collapsed) {
        // get an array of the html rows that are children of the current row
        var rowChildren = chart.rows.filter(f => childIds.indexOf(f.id) > -1);
        // remove those rows
        rowChildren.remove();
    } else {
        // get the data for the child rows as an array
        var childrenData = chart.data.summarized.filter(
            a => childIds.includes(a.id) && (a.filtered != true || a.visible_child)
        );

        // assign a class to the selected row to perform the trick below
        row.classed('selected', true);

        // repeating *s to place children after their parent in the correct order
        childrenData.forEach((childData, i) =>
            chart.tbody
                .insert('tr', '.selected' + ' + *'.repeat(i + 1))
                .classed('chm-table-row', true)
                .classed('children', true)
                .datum(childData)
                .classed('chm-table-row--collapsed', true)
        );

        // grab all the new child rows
        var childrenRows = d3.selectAll('.children');

        // transform data to required format
        const childrenCells = childrenRows.selectAll('td').data(d =>
            chart.config.cols.map(key => {
                return { col: key, text: d[key] };
            })
        );

        // add cells with text to new rows
        childrenCells
            .enter()
            .append('td')
            .text(d => d.text);

        // update chart rows property to include newly added rows
        chart.rows = chart.tbody.selectAll('tr');

        // add the newly drawn rows to the array of clickable rows
        chart.expandable_rows = chart.rows.filter(function(d) {
            return d.nest_level < chart.config.id_cols.length - 1;
        });

        // remove temporary classes
        childrenRows.classed('children', false);
        row.classed('selected', false);

        // apply coloring based on filters
        flagParentRows.call(chart);

        // add on click functionality to new children too
        chart.expandable_rows.on('click', function(d) {
            onClick.call(this, d, chart);
        });

        // apply styling
        customizeRows(chart, childrenRows);

        customizeCells(chart, childrenCells);

        // keep cells on chart object up to date
        chart.cells = chart.tbody.selectAll('td');
    }
}
