import { select } from 'd3';

export default function onClick(th, header) {

    var formColumns = this.config.value_cols.slice(1,6);

    const context = this,
        selection = select(th),
        col = this.config.value_cols[this.config.headers.indexOf(header)];

    if (formColumns.indexOf(col) === -1) { // only want to be able to filter this on the form columns
      null
    } else {

        //Check if column is already a part of current sort order.
    let filterItem = this.filterable.filters.filter(item => item.col === col)[0];

    //If it isn't, add it to filters and set to 100%.
    if (!filterItem) {
        filterItem = {
            col: col,
            direction: 'ascending',
            wrap: this.filterable.wrap
                .append('div')
                .datum({ key: col })
                .classed('wc-button filter-box', true)
                .text(header)
        };
        filterItem.wrap.append('span').classed('filter-direction', true).html(' - 100%');
        filterItem.wrap.append('span').classed('remove-filter', true).html('&#10060;');
        filterItem.level = 1
        this.filterable.filters.push(filterItem);
    } else {
        //Otherwise move to next sort level
        filterItem.level = filterItem.level === 1 ? 0 : filterItem.level === 0 ? 'N/A' : filterItem.level === 'N/A' ? 1 : 'null'
        filterItem.wrap
            .select('span.filter-direction')
            .html(' - ' + (filterItem.level === 1 ? '100%' : filterItem.level === 0 ? '0%' : filterItem.level))
    }

    //Hide sort instructions.
    this.filterable.wrap.select('.instruction').classed('hidden', true);

    //Add sort container deletion functionality.
    this.filterable.filters.forEach((item, i) => {
        item.wrap.on('click', function(d) {
            //Remove column's sort container.
            select(this).remove();

            //Remove column from sort.
            context.filterable.filters.splice(context.filterable.filters.map(d => d.col).indexOf(d.key), 1);

            //Display sorting instruction.
            context.filterable.wrap
                .select('.instruction')
                .classed('hidden', context.filterable.filters.length);

            //Redraw chart.
            context.draw();
        });
    });

    //Redraw chart.
    this.draw();
}
}
