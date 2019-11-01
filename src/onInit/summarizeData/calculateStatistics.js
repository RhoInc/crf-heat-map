import { sum, nest } from 'd3';
import getStatistic from './calculateStatistics/getStatistic';
import getFraction from './calculateStatistics/getFraction';

export default function calculateStatistics(fractions = false) {
    const context = this;

    //Nest data by the ID variable defined above and calculate statistics for each summary variable.
    const id_nest = nest()
        .key(d => d.id)
        .rollup(d => {
            //Define denominators.
            const summary = {
                nForms: d.length
            };

            //Define summarized values, either rates or counts.
            context.initial_config.value_cols.forEach(value_col => {
                //calculate numerator and denominator
                var numerator_count;
                var denominator_count;

                if (typeof value_col.denominator === 'undefined') {
                    //if no denominator
                    numerator_count = sum(d, di => di[value_col.col]);
                    if (value_col.type == 'crfs') denominator_count = summary.nForms;
                } else {
                    //if denominator
                    // ensure numerator is subsetted in the event that an error is made
                    // and an ID has a value of 1 and a denominator value of 0.
                    var subset = d.filter(row => row[value_col.denominator] === '1');
                    numerator_count = sum(subset, di => di[value_col.col]);
                    denominator_count = d.filter(di => di[value_col.denominator] === '1').length;
                }

                summary[value_col.col] = getStatistic(
                    numerator_count,
                    denominator_count,
                    value_col.type
                );

                if (fractions) {
                    summary[value_col.col + '_count'] = getFraction(
                        numerator_count,
                        denominator_count,
                        value_col.type
                    );
                }
            });
            summary.nest_level = d[0].nest_level;
            summary.parents = d[0].parents;
            summary.visit_order = d[0][context.initial_config.visit_order_col];
            summary.form_order = d[0][context.initial_config.form_order_col];
            return summary;
        })
        .entries(this.data.initial_filtered);

    //Convert the nested data array to a flat data array.
    id_nest.forEach(d => {
        d.id = d.key;
        delete d.key;
        this.config.value_cols.forEach(value_col => {
            d[value_col.col] = fractions
                ? d.values[value_col.col] + d.values[value_col.col + '_count'] // value for display
                : d.values[value_col.col];
            d[value_col.col + '_value'] = parseFloat(d.values[value_col.col]); // value for numeric calcs
        });
        d.nest_level = d.values.nest_level;
        d.parents = d.values.parents;
        d.visit_order = d.values.visit_order;
        d.form_order = d.values.form_order;

        delete d.values;
    });

    return nest;
}
