export default function update(filter, reset = false) {

        //update lower slider and annotation
        if (reset)
            filter.lowerSlider
                .attr({
                    min: filter.min,
                    max: function(d) {
                        if (d.variable.indexOf('query') < 0) {
                            return filter.max * 100;
                        } else {
                            return filter.upper;
                        }
                    }
                })
                .property('value', filter.lower);

        //update upper slider and annotation
        if (reset)
            filter.upperSlider
                .attr({
                    min: filter.min,
                    max: function(d) {
                        if (d.variable.indexOf('query') < 0) {
                            return filter.max * 100;
                        } else {
                            return filter.upper;
                        }
                    }
                })
                .property(
                    'value',
                    d => (d.variable.indexOf('query') < 0 ? filter.upper * 100 : filter.upper)
                );

}
