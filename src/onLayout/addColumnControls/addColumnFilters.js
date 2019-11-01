import layoutSliders from './addSliders/layout';
import initializeSliders from './addSliders/update';
import addEventListenersSliders from './addSliders/addEventListeners';
import layoutBoxes from './addInputBoxes/layout';
import initializeBoxes from './addInputBoxes/update';
import addEventListenersBoxes from './addInputBoxes/addEventListeners';
import { select } from 'd3';

export default function addSliders(th, d) {
    //Define layout of header cells.
    const filter = this.columnControls.filters.find(filter => filter.variable === d);
    filter.cell = select(th);

    //Lay out, initialize, and define event listeners for column filter.
    if (this.initial_config.sliders) {
        layoutSliders.call(this, filter);
        initializeSliders.call(this, filter, true);
        addEventListenersSliders.call(this, filter);
    } else {
        layoutBoxes.call(this, filter);
        initializeBoxes.call(this, filter, true);
        addEventListenersBoxes.call(this, filter);
    }
}
