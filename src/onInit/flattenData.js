import processData from './flattenData/processData';

export default function flattenData() {
    var t0 = performance.now();
    //begin performance test

    var data;

    if (this.data.filtered_) {
        data = this.data.filtered_;
    } else {
        data = this.data.initial;
    }

    var config = this.config;

    var flatData = [];
    config.id_cols.forEach(function(d, i) {
        flatData = d3.merge([flatData, processData(data, config, i + 1)]);
    });

    var flatData = flatData.sort(function(a, b) {
        return a.id.slice(1) > b.id.slice(1) ? 1 : a.id.slice(1) < b.id.slice(1) ? -1 : 0;
    });

    config.visitOrder = d3
        .set(
            flatData.map(function(d) {
                return d.flag;
            })
        )
        .values();

    flatData.forEach(function(d) {
        d.flagN = config.visitOrder.indexOf(d.flag) + 1;
    });

    this.data.flattened = flatData;
    this.data.raw = this.data.flattened.slice();

    //end performance test
    var t1 = performance.now();
    console.log('Call to flattenData took ' + (t1 - t0) + ' milliseconds.');
}
