export default function layout(filter) {
    const context = this;

    //add containing div to header cell
    filter.div = filter.cell
        .append('div')
        .datum(filter)
        .classed('range-slider-container', true);

    //lower slider
    filter.lowerSlider = filter.div
        .append('input')
        .classed('range-slider filter-slider--lower', true)
        .attr({
            type: 'range',
            step: context.typeDict[filter.variable] == 'crfs' ? 0.01 : 1,
            min: 0
        });

    filter.lowerAnnotation = filter.div
        .append('span')
        .classed('range-annotation range-annotation--lower', true);

    //upper slider
    filter.upperSlider = filter.div
        .append('input')
        .classed('range-slider filter-slider--upper', true)
        .attr({
            type: 'range',
            step: context.typeDict[filter.variable] == 'crfs' ? 0.01 : 1,
            min: 0
        });
    filter.upperAnnotation = filter.div
        .append('span')
        .classed('range-annotation range-annotation--upper', true);
}
