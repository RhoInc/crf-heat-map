export default function customizeCheckboxes() {
    const context = this;

    //Redefine change event listener of Expand All checkbox.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.option === 'expand_all')
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
                            context.data.raw = context.data.summarized;
                            // need to filter rows when expanding in case some input boxes are in use
                            if (context.columnControls.filtered) {
                                context.data.raw = context.data.raw.filter(
                                    f => !f.filtered || f.visible_child
                                );
                            }
                            context.draw(context.data.raw);
                            context.expandable_rows.classed('chm-table-row--collapsed', false);
                            // I'm making the default when the chart is drawn to collapse all rows and (have the box unchecked)
                            // however I do want it to be checked when it's supposed to so flipping it back here
                            changer_this.checked = context.config[d.option];
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
