import layout from './addSliders/layout';
import initialize from './addSliders/update';
import addEventListeners from './addSliders/addEventListeners';

export default function addSliders(th, d) {
    //Define layout of header cells.
    const filter = this.columnControls.filters.find(filter => filter.variable === d);
    filter.cell = d3.select(th);

    //Lay out, initialize, and define event listeners for column filter.
    layout.call(this, filter);
    initialize.call(this, filter, true);
    addEventListeners.call(this, filter);
}
