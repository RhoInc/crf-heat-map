import summarizeData from './onInit/summarizeData';

export default function onInit() {
    var config = this.config;
    this.data.initial = this.data.raw;
    this.data.initial_filtered = this.data.initial;

    //Summarize raw data.
    summarizeData.call(this);

    // create strcture to aid in nesting and referncing in addRowDipslayToggle.js
    var id;
    this.data.raw.forEach(function(d) {
        id = d['id'].split('|');
        // d[config.id_cols[0]] = null
        // d[config.id_cols[1]] = null
        // d[config.id_cols[2]] = null
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

    //Manually set controls' data to raw data.
    this.controls.data = this.data.initial;
    this.controls.ready = true;
}
