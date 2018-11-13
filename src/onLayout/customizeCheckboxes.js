export default function customizeCheckboxes() {
    const context = this;

    //Redefine change event listener of Expand All checkbox.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'checkbox')
        .select('.changer')
        .on('change', function(d) {
            var changer_this = this;

            var loadingdiv = d3.select('#chm-loading');

            loadingdiv.classed('chm-hidden', false);

            var loading = setInterval(function() {
                var loadingIndicated = loadingdiv.style('display') !== 'none';

                if (loadingIndicated) {
                    clearInterval(loading);
                    loadingdiv.classed('chm-hidden', true);

                    context.config[d.option] = changer_this.checked;

                    console.log(context)

                    if (changer_this.checked) {
                      var check = true
                      if (context.data.summarized.length > context.initial_config.max_rows_warn) {
                          check = confirm("This action will results in drawing over " + String(context.initial_config.max_rows_warn) + " rows which may require extended loading time. Are you sure you want to do this?");
                      }
                      if (check) {
                      context.draw(context.data.summarized);
                      context.expandable_rows.classed('chm-table-row--collapsed', false);
                    } else {
                      changer_this.checked  = false;
                      context.config[d.option] = false;
                    }
                    }  else {
                      context.draw(context.data.summarized.filter(d => d.parents.length == 0));
                      context.expandable_rows.classed('chm-table-row--collapsed', true);
                    }

                }
            }, 25);
        });
}
