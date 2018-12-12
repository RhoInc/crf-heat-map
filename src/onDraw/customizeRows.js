export default function customizeRows(chart, rows) {
    rows
        .classed('chm-table-row', true)
        .classed(
            'chm-table-row--expandable',
            d => d.id.split('  |').length < chart.config.id_cols.length
        )
        .classed(
            'chm-table-row--collapsed',
            d => d.id.split('  |').length < chart.config.id_cols.length
        );
}
