export default function drawRects(container, data) {
    container
        .append('div')
        .classed('chm-legend-component chm-legend-blocks', true)
        .selectAll('div.chm-legend-block')
        .data(data)
        .enter()
        .append('div')
        .classed('chm-legend-div chm-legend-color-block', true)
        .style({
            background: d => d.color,
            color: (d, i) => (i < 3 ? 'black' : 'white')
        })
        .text(d => d.label);
}
