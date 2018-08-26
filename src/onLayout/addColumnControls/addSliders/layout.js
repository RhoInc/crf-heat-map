export default function layout(filter) {
    const context = this;



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
            .text(d => (d.variable.indexOf('query') < 0 ? '%' : ''));

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
            .text(d => (d.variable.indexOf('query') < 0 ? '%' : ''));

}
