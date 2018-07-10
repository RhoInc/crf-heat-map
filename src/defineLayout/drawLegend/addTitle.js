export default function addTitle(container, text) {
    container
        .append('div')
        .classed('chm-legend-component chm-legend-title', true)
        .text(text);
}
