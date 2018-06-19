export default function customizeRows() {
    this.rows = this.tbody.selectAll('tr');
    this.rows
        .classed('row', true)
        .classed(
            'row--expandable row--collapsed',
            d => d.id.split('|').length < this.config.id_cols.length
        )
        .classed('row--hidden', d => d.id.indexOf('|') > -1);
}
