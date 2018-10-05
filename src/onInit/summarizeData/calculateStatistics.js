export default function calculateStatistics(onInit = true) {
    //Nest data by the ID variable defined above and calculate statistics for each summary variable.
    const nest = d3
        .nest()
        .key(d => d.id)
        .rollup(d => {
            //Define denominators.
            const summary = {
                nForms: d.length,
                nNeedsVerification: d.filter(di => di.needs_verification === '1').length,
                nNeedsSignature: d.filter(di => di.needs_signature === '1').length
            };

            //Define summarized values, either rates or counts.
            this.config.value_cols.forEach(value_col => {
                const count = d3.sum(d, di => di[value_col]);
                summary[value_col] =
                    ['is_partial_entry', 'ready_for_freeze', 'is_frozen', 'is_locked'].indexOf(
                        value_col
                    ) > -1
                        ? summary.nForms
                            ? count / summary.nForms
                            : 'N/A'
                        : ['verified'].indexOf(value_col) > -1
                            ? summary.nNeedsVerification
                                ? count / summary.nNeedsVerification
                                : 'N/A'
                            : ['is_signed'].indexOf(value_col) > -1
                                ? summary.nNeedsSignature
                                    ? count / summary.nNeedsSignature
                                    : 'N/A'
                                : ['open_query_ct', 'answer_query_ct'].indexOf(value_col) > -1
                                    ? count
                                    : console.log(`Missed one: ${value_col}`);
            });
            summary.nest_level = d[0].nest_level;
            summary.parents = d[0].parents;
            return summary;
        })
        .entries(this.data.initial_filtered);

    //Convert the nested data array to a flat data array.
    nest.forEach(d => {
        d.id = d.key;
        delete d.key;
        this.config.value_cols.forEach(value_col => {
            d[value_col] = d.values[value_col];
        });
        d.nest_level = d.values.nest_level;
        d.parents = d.values.parents;

        delete d.values;
    });

    //Add summarized data to array of summaries.
    if (onInit) {
        this.data.summaries.push(nest);
    } else {
        return nest;
    }
}
