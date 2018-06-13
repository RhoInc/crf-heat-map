import filterable from './filterable/index';
import flattenData from './flattenData';

export default function onInit() {
    //Attach filterable object to table object.
    //this.filterable = filterable.call(this);

    this.data.initial = this.data.raw;
    var t0 = performance.now();
    flattenData.call(this);
    var t1 = performance.now();
    console.log('Call to flattenData took ' + (t1 - t0) + ' milliseconds.');
}
