import redraw from './customizeFilters/redraw';

export default function customizeFilters() {
    const context = this;

    //Redefine change event listener of filters.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'subsetter')
        .each(function(d) {
            const dropdown = d3.select(this).select('.changer');
            dropdown.on('change', function(di) {
                context.filters.find(filter => filter.col === di.value_col).val = dropdown
                    .select('option:checked')
                    .text();
                context.data.initial_filtered = context.data.initial;
                context.filters.filter(filter => filter.val !== 'All').forEach(filter => {
                    if (filter.val !== 'All')
                        context.data.initial_filtered = context.data.initial_filtered.filter(
                            dii => dii[filter.col] === filter.val
                        );
                });

                //Summarize filtered data and redraw table.
                redraw.call(context);
            });
        });
}
