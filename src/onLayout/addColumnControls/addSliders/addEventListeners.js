import update from './update';
import filterData from '../filterData';

export default function addEventListeners(filter) {
    const context = this;

    //Attach an event listener to Sliders
    filter.sliders = filter.div.selectAll('.range-slider').on('change', function(d) {
        const loadingdiv = context.parent.containers.main.select('#chm-loading');

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

                context.columnControls.filtered = true;
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

    //allow users to change filter settings by editing text annotations - not handling the flip case for simplicity
    filter.upperAnnotation.attr('contenteditable', true).on('blur', function(d) {
        d.upper =
            context.typeDict[filter.variable] == 'crfs'
                ? parseFloat(this.textContent) / 100
                : parseFloat(this.textContent);
        context.columnControls.filtered = true;
        filter.upperSlider.property('value', d.upper);
        filterData.call(context);
        context.draw(context.data.raw);
    });

    filter.lowerAnnotation.attr('contenteditable', true).on('blur', function(d) {
        d.lower =
            context.typeDict[filter.variable] == 'crfs'
                ? parseFloat(this.textContent) / 100
                : parseFloat(this.textContent);
        context.columnControls.filtered = true;
        filter.lowerSlider.property('value', d.lower);
        filterData.call(context);
        context.draw(context.data.raw);
    });
}
