export default function calculateStatistics() {
    const context = this;

    // throw error if any query columns have denominators
    if (
        context.initial_config.value_cols.filter(a => a.denominator && a.type == 'queries')
            .length != 0
    ) {
        throw "Query Columns are sums and should not have denominators. Check the renderer settings and verify that there are no columns with denominators in value_cols with the type 'queries'. ";
    }

    const crfsDenominator = context.initial_config.value_cols.filter(
        a => a.denominator && a.type == 'crfs'
    );

    const crfsNoDenominator = context.initial_config.value_cols.filter(
        a => !a.denominator && a.type == 'crfs'
    );

    const queries = context.initial_config.value_cols.filter(
        a => !a.denominator && a.type == 'queries'
    );

    //Nest data by the ID variable defined above and calculate statistics for each summary variable.
    const nest = d3
        .nest()
        .key(d => d.id)
        .rollup(d => {
            //Define denominators.
            const summary = {
                nForms: d.length
            };

            //calculate count for denominator
            crfsDenominator.forEach(
                c =>
                    (summary['n' + c.denominator] = d.filter(
                        di => di[c.denominator] === '1'
                    ).length)
            );

            //Define summarized values, either rates or counts.
            context.initial_config.value_cols.forEach(value_col => {
                var count;
                if (typeof value_col.denominator === 'undefined') {
                    count = d3.sum(d, di => di[value_col.col]);
                } else {
                    // ensure numerator is subsetted in the event that an error is made
                    // and an ID has a value of 1 and a denominator value of 0.
                    var subset = d.filter(row => row[value_col.denominator] === '1');
                    count = d3.sum(subset, di => di[value_col.col]);
                }
                summary[value_col.col] =
                    crfsNoDenominator.map(m => m.col).indexOf(value_col.col) > -1
                        ? summary.nForms
                            ? Math.floor((count / summary.nForms) * 100) / 100
                            : 'N/A'
                        : crfsDenominator.map(m => m.col).indexOf(value_col.col) > -1
                        ? summary['n' + value_col.denominator]
                            ? Math.floor((count / summary['n' + value_col.denominator]) * 100) / 100
                            : 'N/A'
                        : queries.map(m => m.col).indexOf(value_col.col) > -1
                        ? count
                        : console.log(`Missed one: ${value_col.col}`);
            });
            summary.nest_level = d[0].nest_level;
            summary.parents = d[0].parents;
            summary.visit_order = d[0][context.initial_config.visit_order_col];
            summary.form_order = d[0][context.initial_config.form_order_col];
            return summary;
        })
        .entries(this.data.initial_filtered);

    //Convert the nested data array to a flat data array.
    nest.forEach(d => {
        d.id = d.key;
        delete d.key;
        this.config.value_cols.forEach(value_col => {
            d[value_col.col] = d.values[value_col.col];
        });
        d.nest_level = d.values.nest_level;
        d.parents = d.values.parents;
        d.visit_order = d.values.visit_order;
        d.form_order = d.values.form_order;

        delete d.values;
    });

        return nest;
    }
