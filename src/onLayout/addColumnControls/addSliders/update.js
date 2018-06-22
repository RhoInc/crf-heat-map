export default function update(filter, reset = false) {
    //update lower slider and annotation
    if (reset)
        filter.lowerSlider
            .attr({
                min: filter.min,
                max: filter.max
            })
            .property('value', filter.lower);
    filter.lowerAnnotation.text(
        `${filter.variable.indexOf('query') < 0 ? Math.round(filter.lower * 100) : filter.lower}${
            filter.variable.indexOf('query') < 0 ? '%' : ''
        }`
    );

    //update upper slider and annotation
    if (reset)
        filter.upperSlider
            .attr({
                min: filter.min,
                max: filter.max
            })
            .property('value', filter.upper);
    filter.upperAnnotation.text(
        `${filter.variable.indexOf('query') < 0 ? Math.round(filter.upper * 100) : filter.upper}${
            filter.variable.indexOf('query') < 0 ? '%' : ''
        }`
    );
}
