import customizeRows from './onDraw/customizeRows';
import addStudySummary from './onDraw/addStudySummary';
import customizeCells from './onDraw/customizeCells';
import addInfoBubbles from './onDraw/addInfoBubbles';
import addRowDisplayToggle from './onDraw/addRowDisplayToggle';
import toggleCellAnnotations from './onDraw/toggleCellAnnotations';
import addIdHover from './onDraw/addIdHover';
import dataExport from './onDraw/dataExport';
import flagParentRows from './onDraw/flagParentRows';

export default function onDraw() {
    const config = this.config;
    const chart = this;

    var t0 = performance.now();
    //begin performance test

    // create strcture to aid in nesting and referncing in addRowDipslayToggle.js
    var id;
    chart.data.summarized.forEach(function(d) {
        id = d['id'].split('  |');
        if (id[2]) {
            d[config.id_cols[2]] = id[2];
            d[config.id_cols[1]] = id[1];
            d[config.id_cols[0]] = id[0];
        } else if (id[1]) {
            d[config.id_cols[1]] = id[1];
            d[config.id_cols[0]] = id[0];
        } else {
            d[config.id_cols[0]] = id[0];
        }
    });

    if (this.data.summarized.length) {
        this.rows = this.tbody.selectAll('tr');
        customizeRows(this, this.rows);
        addStudySummary.call(this);

        this.cells = this.tbody.selectAll('td');
        customizeCells(this, this.cells);
        addInfoBubbles.call(this);
        addRowDisplayToggle.call(this);
        toggleCellAnnotations.call(this);
        addIdHover.call(this);
        dataExport.call(this);
        flagParentRows.call(this);
    }

    //Make sure 'Expand All' check box is not checked
    this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.option === 'expand_all')
        .select('.changer')
        .property('checked', false);

    //end performance test
    var t1 = performance.now();
    console.log('Call to onDraw took ' + (t1 - t0) + ' milliseconds.');

    this.parent.containers.loading.classed('chm-hidden', true);
}
