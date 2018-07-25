import redraw from '../onLayout/customizeFilters/redraw';

export default function createNestControls() {
    const context = this;
    const config = this.settings.synced;

    var idList = config.nestings;
    idList.push({ value_col: undefined, label: 'None' });

    this.containers.nestControls
        .append('span')
        .attr('class', 'chm-control-label')
        .text('');
    var idNote = this.containers.nestControls.append('span').attr('class', 'span-description');
    var idSelects = this.containers.nestControls
        .selectAll('select')
        .data([0, 1, 2])
        .enter()
        .append('select')
        .classed('chm-nest-control', true)
        .attr({
            id: d => 'chm-nest-control--' + (d + 1),
            title:
                'These dropdowns control the attributes within which the CRF rates and query counts are aggregated.\n' +
                'Each row in the table represents a combination of one or more of these attributes.'
        });

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
        //indicate loading
        context.containers.loading.classed('chm-hidden', false);

        const loading = setInterval(() => {
            const loadingIndicated = context.containers.loading.style('display') !== 'none';

            if (loadingIndicated) {
                clearInterval(loading);
                context.containers.loading.classed('chm-hidden', true);

                //Capture the currently selected nesting variables.
                var selectedLevels = [];
                idSelects.each(function(d, i) {
                    selectedLevels.push(idList.filter(n => n.label === this.value)[0].value_col);
                });

                //Remove duplicate nesting variables.
                var uniqueLevels = selectedLevels
                    .filter(function(f) {
                        return f != undefined;
                    })
                    .filter(function(item, pos) {
                        return selectedLevels.indexOf(item) == pos;
                    });

                //Update nesting variables.
                context.table.config.id_cols = uniqueLevels;

                //Summarize filtered data and redraw table.
                redraw.call(context.table);
            }
        }, 25);
    });
}
