export default function customizeCheckboxes() {
    const context = this;

    //Redefine change event listener of Expand All checkbox.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'checkbox')
        .select('.changer')
        .on('change', function(d) {
            var changer_this = this;

            var confirmation = true;
            if (
                changer_this.checked &&
                context.data.summarized.length > context.initial_config.max_rows_warn
            ) {
                confirmation = confirm(
                    'This will draw over ' +
                        String(context.initial_config.max_rows_warn) +
                        ' rows. Proceed?'
                );
            }

            if (!confirmation) {
                changer_this.checked = false;
            } else {
                var loadingdiv = d3.select('#chm-loading'); // fix this later due to confirm box

                loadingdiv.classed('chm-hidden', false);

                var loading = setInterval(function() {
                    var loadingIndicated = loadingdiv.style('display') !== 'none';

                    if (loadingIndicated) {
                        clearInterval(loading);
                        loadingdiv.classed('chm-hidden', true);

                        context.config[d.option] = changer_this.checked;

                        if (changer_this.checked) {
                            context.draw(context.data.summarized);
                            context.expandable_rows.classed('chm-table-row--collapsed', false);
                        } else {
                            context.draw(context.data.top);
                            context.expandable_rows.classed('chm-table-row--collapsed', true);
                        }
                    }
                }, 25);
            }
            context.config[d.option] = changer_this.checked;
        });
}
