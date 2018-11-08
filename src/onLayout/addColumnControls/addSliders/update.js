export default function update(filter, reset = false) {
    const context = this;

    //update lower slider and annotation
    if (reset)
        filter.lowerSlider
            .attr({
                min: filter.min,
                max: filter.max
            })
            .property('value', filter.lower);
    filter.lowerAnnotation.text(
        `${
            context.typeDict[filter.variable] == 'crfs'
                ? Math.round(filter.lower * 100)
                : filter.lower
        }${context.typeDict[filter.variable] == 'crfs' ? '%' : ''}`
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
        `${
            context.typeDict[filter.variable] == 'crfs'
                ? Math.round(filter.upper * 100)
                : filter.upper
        }${context.typeDict[filter.variable] == 'crfs' ? '%' : ''}`
    );
}
