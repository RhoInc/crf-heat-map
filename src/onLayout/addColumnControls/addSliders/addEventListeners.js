import update from './update';
import filterData from './filterData';

export default function onInput(filter) {
    const context = this;

    //Attach an event listener to sliders.
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
        filterData.call(context);
        context.draw();
    });
}
