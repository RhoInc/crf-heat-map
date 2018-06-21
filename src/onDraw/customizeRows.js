export default function customizeRows() {
    this.rows = this.tbody.selectAll('tr');
    const alteredSliders = this.columnControls.filters.some(
        di => di.min < di.lower || di.upper < di.max
    );
    this.rows
        .classed('row', true)
        .classed('row--expandable', d => d.id.split('|').length < this.config.id_cols.length)
        .classed(
            'row--collapsed',
            d => d.id.split('|').length < this.config.id_cols.length && !alteredSliders
        )
        .classed('row--hidden', d => d.id.indexOf('|') > -1 && !alteredSliders);
}
