import reset from '../addSliders/update';

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
        reset.call(this, filter, true);
    });
}
