import flattenData from './flattenData';

export default function onInit() {
    this.data.initial = this.data.raw;

    var t0 = performance.now();
    this.data.raw = flattenData.call(this);
    var t1 = performance.now();
    console.log('Call to flattenData took ' + (t1 - t0) + ' milliseconds.');
}
