import customizeRows from './onDraw/customizeRows';
import customizeCells from './onDraw/customizeCells';
import addRowDisplayToggle from './onDraw/addRowDisplayToggle';

export default function onDraw() {
    var chart = this;

    var t0 = performance.now();
    if (this.config.filterable) {
        this.thead.selectAll('th').on('click', function(header) {
            chart.filterable.onClick.call(chart, this, header);
        });
        if (this.filterable.column) this.filterable.filterData.call(this, this.data.filtered);
    }
    customizeRows.call(this);
    customizeCells.call(this);
    addRowDisplayToggle.call(this);
    var t1 = performance.now();
    console.log('Call to onDraw took ' + (t1 - t0) + ' milliseconds.');
}
