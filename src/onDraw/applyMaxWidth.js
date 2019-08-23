export default function applyMaxWidth() {
    const chart = this;
    //ensure that the legend does not extend wider than the table - this could happen as user zooms browser
    d3
        .select('#chm-right-column-row-1')
        .style('max-width', `${chart.table.property('clientWidth')}px`);
}
