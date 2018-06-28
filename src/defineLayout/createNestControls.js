import redraw from '../onLayout/customizeFilters/redraw';

export default function createNestControls() {
    const context = this;
    const config = this.settings.synced;

    var idList = config.nestings;
    idList.push({ value_col: undefined, label: 'None' });

    var idControlWrap = this.containers.nestControls
        .append('div')
        .attr('class', 'chm-control chm-control--nest');
    idControlWrap
        .append('span')
        .attr('class', 'chm-control-label')
        .text('Show Status for:');
    var idNote = idControlWrap
        .append('span')
        .attr('class', 'span-description');
    var idSelects = idControlWrap
        .selectAll('select')
        .data([0, 1, 2])
        .enter()
        .append('select');

    idSelects
        .selectAll('option')
        .data(
            d =>
                d === 0 // first dropdown shouldn't have "None" option
                    ? idList.filter(n => n.value_col !== undefined)
                    : idList
        )
        .enter()
        .append('option')
        .text(function(d) {
            return d.label;
        })
        .property('selected', function(d) {
            var levelNum = d3.select(this.parentNode).datum();
            return d.value_col == config.id_cols[levelNum];
        });

    idSelects.on('change', function() {
        var selectedLevels = [];
        idSelects.each(function(d, i) {
            selectedLevels.push(idList.filter(n => n.label === this.value)[0].value_col);
        });

        var uniqueLevels = selectedLevels
            .filter(function(f) {
                return f != undefined;
            })
            .filter(function(item, pos) {
                return selectedLevels.indexOf(item) == pos;
            });

        console.log(context);
        context.table.config.id_cols = uniqueLevels;

        //Summarize filtered data and redraw table.
        redraw.call(context.table);
    });
}
