import { select } from 'd3';

export default function layout() {
    const context = this;

    //Add filter container.
    this.filterable.wrap = this.wrap
        .select('.table-top')
        .append('div')
        .classed('hidden', !this.config.filterable);
    this.filterable.wrap
        .append('div')
        .classed('instruction', true)
        .text('Click column headers to filter.');
}
