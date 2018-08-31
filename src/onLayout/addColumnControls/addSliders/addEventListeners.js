import update from './update';
import filterData from './filterData';

export default function onInput(filter) {
    const context = this;

    var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

    if (isIE) {
        //Attach an event listener to sliders.
        filter.sliders = filter.div.selectAll('.range-value').on('change', function(d) {
            const loadingdiv = d3.select('#chm-loading');

            loadingdiv.classed('chm-hidden', false);

            const loading = setInterval(() => {
                const loadingIndicated = loadingdiv.style('display') !== 'none';

                if (loadingIndicated) {
                    clearInterval(loading);
                    loadingdiv.classed('chm-hidden', true);

                    const sliders = this.parentNode.parentNode.getElementsByTagName('input');
                    const slider1 = parseFloat(sliders[0].value);
                    const slider2 = parseFloat(sliders[1].value);

                    if (slider1 <= slider2) {
                        if (d.variable.indexOf('query') < 0) {
                            d.lower = slider1 / 100;
                            d.upper = slider2 / 100;
                        } else {
                            d.lower = slider1;
                            d.upper = slider2;
                        }
                    } else {
                        if (d.variable.indexOf('query') < 0) {
                            d.lower = slider2 / 100;
                            d.upper = slider1 / 100;
                        } else {
                            d.lower = slider2;
                            d.upper = slider1;
                        }
                    }
                    update.call(context, d);
                    filterData.call(context);
                    context.draw(context.data.raw);
                }
            }, 25);
        });

        filter.sliders = filter.div.selectAll('.range-value').on('input', function(d) {
            const sliders = this.parentNode.parentNode.getElementsByTagName('input');
            const slider1 = parseFloat(sliders[0].value);
            const slider2 = parseFloat(sliders[1].value);

            if (slider1 <= slider2) {
                if (d.variable.indexOf('query') < 0) {
                    d.lower = slider1 / 100;
                    d.upper = slider2 / 100;
                } else {
                    d.lower = slider1;
                    d.upper = slider2;
                }
            } else {
                if (d.variable.indexOf('query') < 0) {
                    d.lower = slider2 / 100;
                    d.upper = slider1 / 100;
                } else {
                    d.lower = slider2;
                    d.upper = slider1;
                }
            }
            update.call(context, d);
        });
    } else {
        filter.sliders = filter.div.selectAll('.range-slider').on('change', function(d) {
            const loadingdiv = d3.select('#chm-loading');

            loadingdiv.classed('chm-hidden', false);

            const loading = setInterval(() => {
                const loadingIndicated = loadingdiv.style('display') !== 'none';

                if (loadingIndicated) {
                    clearInterval(loading);
                    loadingdiv.classed('chm-hidden', true);

                    const sliders = this.parentNode.getElementsByTagName('input');
                    const slider1 = parseFloat(sliders[0].value);
                    const slider2 = parseFloat(sliders[1].value);

                    if (slider1 <= slider2) {
                        d.lower = slider1;
                        d.upper = slider2;
                    } else {
                        d.lower = slider2;
                        d.upper = slider1;
                    }

                    update.call(context, d);
                    filterData.call(context);
                    context.draw(context.data.raw);
                }
            }, 25);
        });

        filter.sliders = filter.div.selectAll('.range-slider').on('input', function(d) {
            const sliders = this.parentNode.getElementsByTagName('input');
            const slider1 = parseFloat(sliders[0].value);
            const slider2 = parseFloat(sliders[1].value);

            if (slider1 <= slider2) {
                d.lower = slider1;
                d.upper = slider2;
            } else {
                d.lower = slider2;
                d.upper = slider1;
            }

            update.call(context, d);
        });
    }
}
