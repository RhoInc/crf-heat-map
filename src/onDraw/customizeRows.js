export default function customizeRows() {
    this.rows = this.tbody.selectAll('tr');
    this.rows
        .classed('chm-table-row', true)
        .classed(
            'chm-table-row--expandable',
            d => d.id.split('  |').length < this.config.id_cols.length
        )
        .classed(
            'chm-table-row--collapsed',
            d => d.id.split('  |').length < this.config.id_cols.length
        )
        .classed('chm-hidden', d => d.id.indexOf('  |') > -1);
}
