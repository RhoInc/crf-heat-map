export default function layout(filter) {
    const context = this;

    var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
    if (isIE) {
        //add containing div to header cell
        filter.div = filter.cell
            .append('div')
            .datum(filter)
            .classed('range-slider-container', true);

        //lower slider
        const rangeValueLowerDiv = filter.div
            .append('div')
            .classed('range-value-container range-value-container--lower', true);
        filter.lowerSlider = rangeValueLowerDiv
            .append('input')
            .classed('range-value filter-value--lower', true)
            .attr({
                type: 'number',
                min: 0,
                step: 1,
                value: 0
            });

        rangeValueLowerDiv
            .append('span')
            .classed('chm-text', true)
            .text(d => (context.typeDict[d.variable] == 'crfs' ? '%' : ''));

        filter.div
            .append('span')
            .classed('chm-dash', true)
            .text(d => ' - ');

        //upper slider
        const rangeValueUpperDiv = filter.div
            .append('div')
            .classed('range-value-container range-value-container--upper', true);
        filter.upperSlider = rangeValueUpperDiv
            .append('input')
            .classed('range-value filter-value--upper', true)
            .attr({
                type: 'number',
                min: 0,
                step: 1,
                value: 100
            });

        rangeValueUpperDiv
            .append('span')
            .classed('chm-text', true)
            .text(d => (context.typeDict[d.variable] == 'crfs' ? '%' : ''));
    } else {
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
}
