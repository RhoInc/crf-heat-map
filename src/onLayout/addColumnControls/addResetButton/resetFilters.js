import reset from '../addSliders/update';

export default function resetFilters() {
    this.columnControls.filters.forEach(filter => {
        filter.lower = filter.min;
        filter.upper = filter.max;
        reset.call(this, filter, true);
    });
}
