export default function customizeRows() {
    this.rows = this.tbody.selectAll('tr');
    this.rows
        .classed('row', true)
        .classed('row--expandable row--collapsed', d => d.level < this.config.id_cols.length)
        .classed('row--hidden', d => d.level > 1);
}
