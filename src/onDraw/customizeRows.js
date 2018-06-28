export default function customizeRows() {
    this.rows = this.tbody.selectAll('tr');
    this.rows
        .classed('row', true)
        .classed('poo', function(d) {
            console.log(d);
        })
        .classed('row--expandable', d => d.id.split('|').length < this.config.id_cols.length)
        .classed('row--collapsed', d => d.id.split('|').length < this.config.id_cols.length)
        .classed('row--hidden', d => d.id.indexOf('|') > -1);
}
