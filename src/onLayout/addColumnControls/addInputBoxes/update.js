export default function update(filter, reset = false) {
    const context = this;

    //update lower input box
    if (reset)
        filter.lowerBox
            .attr({
                min: filter.min,
                max: function(d) {
                    if (context.typeDict[d.variable] == 'crfs') {
                        return filter.max * 100;
                    } else {
                        return filter.upper;
                    }
                }
            })
            .property('value', filter.lower);

    //update upper input box
    if (reset)
        filter.upperBox
            .attr({
                min: filter.min,
                max: function(d) {
                    if (context.typeDict[d.variable] == 'crfs') {
                        return filter.max * 100;
                    } else {
                        return filter.upper;
                    }
                }
            })
            .property(
                'value',
                d => (context.typeDict[d.variable] == 'crfs' ? filter.upper * 100 : filter.upper)
            );
}
