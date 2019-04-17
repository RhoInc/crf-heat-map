export default function enforceNestLogic(id_cols) {

    // limit select options to those that are not already selected (except for None - want to keep that around)
    this.containers.nestControls
      .selectAll('select').selectAll('option').style('display',d => id_cols.includes(d.value_col) ? 'none' : null)

    // disable third nest level when the second is not chosen
    d3.select('#chm-nest-control--3').property('disabled',id_cols.length === 1 ? true : false)

    //hide None option from second nest when third is selected
    d3.select('#chm-nest-control--2').selectAll('option').filter(d => d.label ==="None").style('display', id_cols.length === 3 ? "none" : null )

}
