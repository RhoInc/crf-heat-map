import redraw from './customizeFilters/redraw';
import { select } from 'd3';

export default function customizeFilters() {
    const context = this;

    //Redefine change event listener of filters.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'subsetter')
        .each(function(d) {
            const dropdown = select(this).select('.changer');

            dropdown.on('change', function(di) {
                //indicate loading
                context.parent.containers.loading.classed('chm-hidden', false);

                const loading = setInterval(() => {
                    const loadingIndicated =
                        context.parent.containers.loading.style('display') !== 'none';

                    if (loadingIndicated) {
                        clearInterval(loading);
                        context.parent.containers.loading.classed('chm-hidden', true);

                        //Update filter val
                        context.filters.find(filter => filter.col === di.value_col).val = this
                            .multiple
                            ? dropdown
                                  .selectAll('option:checked')
                                  .pop()
                                  .map(d => d.textContent)
                            : dropdown.selectAll('option:checked').text();

                        //Update filter index
                        context.filters.find(filter => filter.col === di.value_col).index = this
                            .multiple
                            ? null
                            : dropdown.selectAll('option:checked').property('index');

                        //Filter data.
                        context.data.initial_filtered = context.data.initial;
                        context.filters
                            .filter(
                                filter =>
                                    !(filter.all === true && filter.index === 0) &&
                                    !(
                                        Array.isArray(filter.val) &&
                                        filter.val.length === filter.choices.length
                                    )
                            )
                            .forEach(filter => {
                                context.data.initial_filtered = context.data.initial_filtered.filter(
                                    dii =>
                                        Array.isArray(filter.val)
                                            ? filter.val.indexOf(dii[filter.col]) > -1
                                            : dii[filter.col] === filter.val
                                );
                            });

                        //Summarize filtered data and redraw table.
                        redraw.call(context);
                    }
                }, 25);
            });
        });
}
