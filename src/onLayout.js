import applyFilters from './onLayout/applyFilters';
import flattenData from './flattenData';
import createNestControl from './onLayout/createNestControl';
import drawLegend from './onLayout/drawLegend';
import addColumnControls from './onLayout/addColumnControls';

export default function onLayout() {
    var chart = this;

    //Attach filter container.
    //this.filterable.layout.call(this);

    //var selects = this.controls.wrap.selectAll('select');
    //selects.on('change', function() {
    //    // Get the selected levels
    //    var selectedfilterLevels = [];
    //    selects.each(function(d, i) {
    //        selectedfilterLevels.push(this.value);
    //    });

    //    // Update filters to reflect the selected levels
    //    chart.filters.forEach(function(d, i) {
    //        d.val = selectedfilterLevels[i];
    //    });

    //    applyFilters.call(chart);
    //    var t0 = performance.now();
    //    flattenData.call(chart);
    //    var t1 = performance.now();
    //    console.log('Call to flattenData took ' + (t1 - t0) + ' milliseconds.');

    //    chart.draw();
    //});

    createNestControl.call(chart);
    drawLegend.call(chart);
    addColumnControls.call(this);
}
