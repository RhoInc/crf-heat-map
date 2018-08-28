import update from './update';
import filterData from './filterData';

export default function onInput(filter) {
    const context = this;

    var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

    if (isIE) {
        //Attach an event listener to sliders.
        filter.sliders = filter.div.selectAll('.range-value').on('change', function(d) {
            //Expand rows and check 'Expand All'.
            // context.config.expand_all = true;
            // context.controls.wrap
            //     .selectAll('.control-group')
            //     .filter(f => f.option === 'expand_all')
            //     .select('input')
            //     .property('checked', true);
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
        });

        filter.sliders = filter.div.selectAll('.range-value').on('input', function(d) {
            //Expand rows and check 'Expand All'.
            // context.config.expand_all = true;
            // context.controls.wrap
            //     .selectAll('.control-group')
            //     .filter(f => f.option === 'expand_all')
            //     .select('input')
            //     .property('checked', true);
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
            //Expand rows and check 'Expand All'.
            // context.config.expand_all = true;
            // context.controls.wrap
            //     .selectAll('.control-group')
            //     .filter(f => f.option === 'expand_all')
            //     .select('input')
            //     .property('checked', true);
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
        });

        filter.sliders = filter.div.selectAll('.range-slider').on('input', function(d) {
            //Expand rows and check 'Expand All'.
            // context.config.expand_all = true;
            // context.controls.wrap
            //     .selectAll('.control-group')
            //     .filter(f => f.option === 'expand_all')
            //     .select('input')
            //     .property('checked', true);
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
