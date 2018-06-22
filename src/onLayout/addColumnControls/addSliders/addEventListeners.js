import update from './update';
import filterData from './filterData';

export default function onInput(filter) {
    const context = this;

    //Attach an event listener to sliders.
    filter.sliders = filter.div.selectAll('.range-slider').on('input', function(d) {

        //expand rows and check 'Expand All' Box
        context.config.expand_all = true
        context.controls.wrap
              .selectAll('.control-group')
              .filter(f => f.option === 'expand_all')
              .select('input')
              .property('checked', true);

        const sliders = this.parentNode.getElementsByTagName('input');
        const slider1 = parseFloat($( ".range-annotation" ).val(ui.values[ 0 ]));
        const slider2 = parseFloat($( ".range-annotation" ).val(ui.values[ 1 ]));


            d.lower = slider1;
            d.upper = slider2;


        update.call(context, d);
        filterData.call(context);
        context.draw();
    });
}
