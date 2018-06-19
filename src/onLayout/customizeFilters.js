import resetFilters from './addColumnControls/addResetButton/resetFilters';

export default function customizeFilters() {
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'subsetter')
        .on('change', () => {
            this.data.raw = this.data.flattened.slice();
            this.data.filtered = this.data.raw.slice();
            this.filters.forEach(filter => {
                this.data.filtered = this.data.filtered.filter(
                    d => filter.val === 'All' || d[filter.col] === filter.val
                );
            });
            resetFilters.call(this);
            this.draw();
        });
}
