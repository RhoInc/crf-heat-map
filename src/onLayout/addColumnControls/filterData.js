import { set, merge } from 'd3';

export default function filterData() {
    this.data.summarized.forEach(function(d) {
        d.filtered = false;
        d.visible_child = false;
    });

    //First, get all the rows that match the filters
    this.columnControls.filters.forEach(filter => {
        this.data.summarized.forEach(function(d) {
            // filter N/As (as 100%) too
            if (d[filter.variable] == 'N/A' && +filter.upper < 1) {
                d.filtered = true;
            } else {
                var filtered_low = +d[filter.variable + '_value'] < +filter.lower;
                var filtered_high = +d[filter.variable + '_value'] > +filter.upper;
                //filtered_missing = d[filter.variable] === 'N/A'
                if (filtered_low || filtered_high) {
                    d.filtered = true;
                }
            }
        });
    });

    //now, identify hidden parent rows that have visible rowChildren
    //for rows that are visible (filtered = false)
    var visible_row_parents = this.data.summarized.filter(f => !f.filtered).map(f => f.parents);
    var unique_visible_row_parents = set(merge(visible_row_parents)).values();

    //identifiy the parent rows
    this.data.raw = this.data.summarized.map(function(m) {
        m.visible_child = unique_visible_row_parents.indexOf(m.id) > -1;
        return m;
    });

    this.data.raw = this.data.raw.filter(d => d.parents.length == 0); // only want to draw top level;

    this.data.raw = this.data.raw.filter(f => !f.filtered || f.visible_child);
}
