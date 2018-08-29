export default function customizeCheckboxes() {
    const context = this;

    //Redefine change event listener of Expand All checkbox.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'checkbox')
        .select('.changer')
        .on('change', function(d) {

          const loadingdiv = d3.select("#chm-loading")

          loadingdiv.classed('chm-hidden', false);

          const loading = setInterval(() => {
              const loadingIndicated = loadingdiv.style('display') !== 'none';

              if (loadingIndicated) {
                  clearInterval(loading);
                  loadingdiv.classed('chm-hidden', true);

            context.config[d.option] = this.checked;
            context.draw(context.data.raw);
          }
          }, 25);
        });
}
