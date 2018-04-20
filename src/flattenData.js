import processData from './flattenData/processData';

export default function flattenData() {
    var data;

    if (this.data.filtered) {
        data = this.data.filtered;
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
    return flatData;
}
