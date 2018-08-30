export default function customizeCheckboxes() {
    const context = this;

    //Redefine change event listener of Expand All checkbox.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'checkbox')
        .select('.changer')
        .on('change', function(d) {
          var changer_this = this

var loadingdiv = d3.select("#chm-loading");

      loadingdiv.classed('chm-hidden', false);

var loading = setInterval(function () {

           var loadingIndicated = loadingdiv.style('display') !== 'none';

             if (loadingIndicated) {
               clearInterval(loading);
              loadingdiv.classed('chm-hidden', true);

               context.config[d.option] = changer_this.checked;
               context.draw(context.data.raw);
            }
        }, 25);
})
}
