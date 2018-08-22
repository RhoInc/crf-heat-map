export default function customizeCheckboxes() {
    const context = this;
    const config = this.config;

    //Redefine change event listener of Expand All checkbox.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'checkbox')
        .select('.changer')
        .on('change', function(d) {

          var expandable_rows = context.rows
              .filter(function(d) {
                  return d.id.split('|').length < config.id_cols.length;
              })
              .select('td');

            context.config[d.option] = this.checked;
            if (this.checked) {
d3.selectAll('tr').classed('chm-table-row--expanded', true)
d3.selectAll('tr').classed('chm-hidden chm-table-row--collapsed', false)
}
else {
context.draw(context.data.raw);
}


        });
}
