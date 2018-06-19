export default function filterData() {
    this.data.raw = this.data.flattened;
    this.columnControls.filters.forEach(filter => {
        this.data.raw = this.data.raw.filter(
            d =>
                (filter.lower <= d[filter.variable] && d[filter.variable] <= filter.upper) ||
                (filter.lower === 0 && d[filter.variable] === 'N/A')
        );
    });
}
