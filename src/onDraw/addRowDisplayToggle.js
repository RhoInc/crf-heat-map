import iterateNest from './addRowDisplayToggle/iterateNest';
import onClick from './addRowDisplayToggle/onClick';

export default function addRowDisplayToggle() {
    var chart = this;
    var config = this.config;

    // this is a nested object with parent ids as the keys and child ids as the "values"
    chart.childNest = iterateNest.call(this);

    // get all of the clickable rows
    chart.expandable_rows = this.rows.filter(function(d) {
        return d.nest_level < config.key_cols.length - 1;
    });

    chart.expandable_rows.on('click', function(d) {
        onClick.call(this, d, chart);
    });
}
