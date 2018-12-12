import resetSliders from '../addSliders/update';
import resetBoxes from '../addInputBoxes/update';

export default function resetFilters() {
    this.columnControls.filters.forEach(filter => {
        //Update query maximum.
        if (filter.variable.indexOf('query') > -1) {
            filter.max = d3.max(this.data.summarized, di => di[filter.variable]);
        }
        //Reset upper and lower bounds.
        filter.lower = filter.min;
        filter.upper = filter.max;

        //Reset sliders.
        this.initial_config.sliders
            ? resetSliders.call(this, filter, true)
            : resetBoxes.call(this, filter, true);
    });
}
