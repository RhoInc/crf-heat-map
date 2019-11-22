import { select } from 'd3';

export default function tweakMultiSelects() {
    const context = this;

    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'subsetter' && d.multiple)
        .each(function(d) {
            select(this)
                .select('select')
                .attr(
                    'size',
                    context.filters.find(filter => filter.col === d.value_col).choices.length
                )
                .attr('title', 'Hold the CTRL key to select or deselect a single option.')
                .selectAll('option')
                .property('selected', true);
        });
}
