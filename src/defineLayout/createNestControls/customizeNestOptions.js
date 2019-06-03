export default function customizeNestOptions(id_cols) {
    // disable third nest level when the second is not chosen
    this.containers.main
        .select('#chm-nest-control--3')
        .property('disabled', id_cols.length === 1 ? true : false);

    // hide options that are selected in higher level nests
    this.containers.nestControls
        .selectAll('#chm-nest-control--3, #chm-nest-control--2')
        .selectAll('option')
        .style('display', function(d) {
            var ids = id_cols.slice(0, d3.select(this.parentNode).datum());
            return ids.includes(d.value_col) ? 'none' : null;
        });

    //hide None option from second nest when third is selected
    this.containers.main
        .select('#chm-nest-control--2')
        .selectAll('option')
        .filter(d => d.label === 'None')
        .style('display', id_cols.length === 3 ? 'none' : null);
}
