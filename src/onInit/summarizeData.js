import calculateStatistics from './summarizeData/calculateStatistics';

export default function summarizeData() {
    var t0 = performance.now();
    //begin performance test

    this.data.summaries = [];

    //Summarize data by each ID variable.
    this.config.id_cols.forEach((id_col, i) => {
        //Define ID variable.  Each ID variable needs to capture the value of the previous ID variable(s).
        this.data.initial_filtered.forEach(d => {
            d.nest_level = i;
            d.id = this.config.id_cols
                .slice(0, i + 1)
                .map(id_col1 => d[id_col1])
                .join('|');

            d.parents = [];
            if (d.nest_level == 2) {
                d.parents.push(
                    this.config.id_cols
                        .slice(0, 2)
                        .map(id_col1 => d[id_col1])
                        .join('|')
                );
            }
            if (d.nest_level == 1) {
                d.parents.push(
                    this.config.id_cols
                        .slice(0, 1)
                        .map(id_col1 => d[id_col1])
                        .join('|')
                );
            }
        });

        calculateStatistics.call(this);
    });

    //Collapse array of arrays to array of objects.
    this.data.summarized = d3.merge(this.data.summaries).sort((a, b) => (a.id < b.id ? -1 : 1));
    this.data.raw = this.data.summarized;

    //end performance test
    var t1 = performance.now();
    console.log('Call to summarizeData took ' + (t1 - t0) + ' milliseconds.');
}
