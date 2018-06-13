import flattenData from './flattenData';
import filterable from './filterable/index';

export default function onInit() {
    this.data.initial = this.data.raw;

    //Attach filterable object to table object.
    this.filterable = filterable.call(this);

    var t0 = performance.now();
    flattenData.call(this);
    var t1 = performance.now();
    console.log('Call to flattenData took ' + (t1 - t0) + ' milliseconds.');
}
