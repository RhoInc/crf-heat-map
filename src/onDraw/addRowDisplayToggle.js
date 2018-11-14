import customizeRows from './customizeRows';
import customizeCells from './customizeCells';
import flagParentRows from './flagParentRows';

export default function addRowDisplayToggle() {
    var chart = this;
    var config = this.config;

    if (this.config.expand_all) {
        this.rows.classed('chm-hidden', false);
    }

    var rows = this.rows[0];
    var max_id_level = chart.config.id_cols.length - 2;

    function iterateNest(d, id_level) {
        return d3
            .nest()
            .key(d => d[config.id_cols[id_level]])
            .rollup(function(rows) {
                if (id_level + 1 <= max_id_level) {
                    var obj = iterateNest(rows, id_level + 1);
                } else {
                    obj = {};
                }
                obj.ids = rows.filter(f => f.nest_level == id_level + 1).map(m => m.id);
                return obj;
            })
            .map(d);
    }

    var childNest = iterateNest(chart.data.summarized, 0);

    chart.expandable_rows = this.rows.filter(function(d) {
        return d.nest_level < config.id_cols.length - 1;
    });

    function onClick(d) {
        var row = d3.select(this);

        var collapsed = !row.classed('chm-table-row--collapsed');

        row
            .classed('chm-table-row--collapsed', collapsed) //toggle the class
            .classed('chm-table-row--expanded', !collapsed); //toggle the class

        var currentNest = childNest;
        d.id.split('  |').forEach(function(level) {
            currentNest = currentNest[level];
        });

        var childIds;
        // when collapsing, if the nest's children have children, loop throough and build array with those included
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

        var rowChildren = chart.rows.filter(f => childIds.indexOf(f.id) > -1);
        if (collapsed) {
            rowChildren.remove();
        } else {
            rowChildren.classed('chm-hidden', false); //show just the immediate children

            // get the data for the child rows
            var childrenData = chart.data.summarized.filter(
                a => childIds.includes(a.id) && (a.filtered != true || a.visible_child)
            );

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

            // update expandable_rows with the newly drawn rows
            chart.expandable_rows = chart.rows.filter(function(d) {
                return d.nest_level < config.id_cols.length - 1;
            });

            // remove classes
            childrenRows.classed('children', false);
            row.classed('selected', false);

            // apply coloring based on filters
            flagParentRows.call(chart);

            // add on click functionality to new children too
            chart.expandable_rows.on('click', onClick);

            // apply styling
            customizeRows(chart, childrenRows);

            customizeCells(chart, childrenCells);
        }
    }
    chart.expandable_rows.on('click', onClick);
}
