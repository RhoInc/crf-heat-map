import customizeRows from './onDraw/customizeRows';
import customizeCells from './onDraw/customizeCells';
import addRowDisplayToggle from './onDraw/addRowDisplayToggle';

export default function onDraw() {
    var t0 = performance.now();
    customizeRows.call(this);
    customizeCells.call(this);
    addRowDisplayToggle.call(this);
    var t1 = performance.now();
    console.log('Call to onDraw took ' + (t1 - t0) + ' milliseconds.');
}
