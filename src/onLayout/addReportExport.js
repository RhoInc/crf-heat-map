export default function addReportExport() {
        this.exportable.wrap
            .append('a', '#csv')
            .classed('wc-button export', true)
            .attr('id', 'report')
            .text('Report');
}
