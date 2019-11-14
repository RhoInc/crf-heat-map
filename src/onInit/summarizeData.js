import calculateStatistics from './summarizeData/calculateStatistics';
import sortRows from './summarizeData/sortRows';
import clone from '../util/clone';
import { nest } from 'd3';

export default function summarizeData(
    key_cols = this.config.key_cols,
    data = this.data.initial_filtered
) {
    const context = this;
    const fractions = this.config.display_fractions;
    var t0 = this.parent.performance.now();
    //begin performance test

    const data_copy = clone(data); // don't want to change original data object
    const data_summarized = [];

    //Summarize data by each ID variable.
    key_cols.forEach((id_col, i) => {
        //Define ID variable.  Each ID variable needs to capture the value of the previous ID variable(s).
        data_copy.forEach(d => {
            d.nest_level = i;
            d.id = key_cols
                .slice(0, i + 1)
                .map(id_col1 => d[id_col1])
                .join('  |');

            d.parents = [];
            if (d.nest_level == 2) {
                d.parents.push(
                    key_cols
                        .slice(0, 2)
                        .map(id_col1 => d[id_col1])
                        .join('  |')
                );
            }
            if (d.nest_level == 1) {
                d.parents.push(
                    key_cols
                        .slice(0, 1)
                        .map(id_col1 => d[id_col1])
                        .join('  |')
                );
            }
        });

        data_summarized.push(calculateStatistics.call(this, data_copy, fractions));

        // build dictionary to look up type for each cell column and save to chart - going to use this freaking everywhere
        context.typeDict = nest()
            .key(d => d.col)
            .rollup(rows => rows[0].type)
            .map(context.initial_config.value_cols);
    });

    // sort rows
    const data_sorted = sortRows.call(this, data_summarized, key_cols);

    //end performance test
    var t1 = this.parent.performance.now();
    console.log('Call to summarizeData took ' + (t1 - t0) + ' milliseconds.');

    return data_sorted;
}
