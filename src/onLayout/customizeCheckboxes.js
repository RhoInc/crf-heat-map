export default function customizeCheckboxes() {
    const context = this;

    //Redefine change event listener of Expand All checkbox.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'checkbox')
        .select('.changer')
        .on('change', function(d) {
            context.config[d.option] = this.checked;
            context.draw(context.data.raw);
        });
}
