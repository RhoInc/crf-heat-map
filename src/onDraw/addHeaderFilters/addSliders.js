export default function addSliders(th, d) {
    const sliders = {
        lower: 0,
        upper: d.indexOf('query') < 0 ? 100 : d3.max(this.data.raw, di => di[d]),
    };

    //elements
    sliders.container = d3.select(th)
        .append('div')
        .classed('range-slider-container', true);
    sliders.lowerInput = sliders.container
        .append('input')
        .classed('range-slider', true)
        .attr({
            value: sliders.lower,
            min: sliders.lower,
            max: sliders.upper,
            step: 1,
            type: 'range',
        });
    sliders.upperInput = sliders.container
        .append('input')
        .classed('range-slider', true)
        .attr({
            value: sliders.upper,
            min: sliders.lower,
            max: sliders.upper,
            step: 1,
            type: 'range',
        });

    //method
    sliders.getVals = function() {
        // Get slider values
        var parent = this.parentNode;
        var slides = parent.getElementsByTagName('input');
        var slider1 = parseFloat( slides[0].value );
        var slider2 = parseFloat( slides[1].value );

        // Neither slider will clip the other, so make sure we determine which is larger
        if ( slider1 > slider2 ) {
            var tmp = slider2;
            slider2 = slider1;
            slider1 = tmp;
        }

        sliders.lower = slider1;
        sliders.upper = slider2;
    }

    sliders.lowerInput.node().oninput = sliders.getVals;
    sliders.lowerInput.node().oninput();
    sliders.upperInput.node().oninput = sliders.getVals;
    sliders.upperInput.node().oninput();

    this.columnFilters.sliders.push(sliders);
}
