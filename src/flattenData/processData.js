export default function processData(data, settings, level) {
    //add array item for each flag
    const longData = [];
    const variables = Object.keys(data[0]).filter(key => settings.value_cols.indexOf(key) < 0);
    data.forEach(d => {
        //make key variable for specified levels
        const nestKey =
            '' +
            level +
            settings.id_cols
                .filter((id_col, i) => i < level)
                .map(id_col => d[id_col])
                .join(':');

        settings.value_cols.forEach(flag => {
            const newD = {
                nestKey: nestKey
            };

            for (let i = 0; i < variables.length; i++) newD[variables[i]] = d[variables[i]];
            newD[flag] = d[flag];
            newD.flag = flag;
            longData.push(newD);
        });
    });

    //Nest data and calculate values for cells
    var ptCols = d3.merge([settings.id_cols, settings.filter_cols]);

    var nested = d3
        .nest()
        .key(function(d) {
            return d.nestKey;
        })
        .key(function(d) {
            return d['flag'];
        })
        .rollup(function(v) {
            // Sums for Query variables
            if (v[0].flag == 'has_open_query' || v[0].flag == 'has_answered_query') {
                return {
                    raw: v,
                    proportion: d3.sum(v, function(d) {
                        return d[d.flag];
                    })
                };

                // Proportions for is_signed using needs_signature as denominator
            } else if (v[0].flag == 'is_signed') {
                //If there's a denominator of zero we want to catch that - right now I'm saying they're 100% done, may change that
                if (v.filter(d => d.needs_signature === '1').length === 0) {
                    return {
                        raw: v,
                        proportion: 'N/A'
                    };
                } else {
                    return {
                        raw: v,
                        proportion:
                            d3.sum(v, function(d) {
                                return d[d.flag];
                            }) / v.filter(d => d.needs_signature === '1').length
                    };
                }
                // Proportions for is_verified using needs_verification as denominator
            } else if (v[0].flag == 'DATA_PAGE_VERIFIED') {
                //If denominator is 0 label cell N/A
                if (v.filter(d => d.needs_verification === '1').length === 0) {
                    return {
                        raw: v,
                        proportion: 'N/A'
                    };
                } else {
                    return {
                        raw: v,
                        proportion:
                            d3.sum(v, function(d) {
                                return d[d.flag];
                            }) / v.filter(d => d.needs_verification === '1').length
                    };
                }
            } else {
                return {
                    //Proportions for everybody else - using full count for denominator
                    raw: v,
                    proportion:
                        d3.sum(v, function(d) {
                            return d[d.flag];
                        }) / v.length
                };
            }
        })
        .entries(longData);

    //Flatten the nested data
    var flatData = [];

    nested.forEach(function(d) {
        var ptObj = {};
        ptObj.id = d.key;
        ptObj.level = level;
        var ptCols = d3.merge([settings.id_cols, settings.filter_cols]);
        ptCols.forEach(function(col) {
            ptObj[col] = d.values[0].values.raw[0][col];
        });
        d.values.forEach(function(v) {
            ptObj[v.key] = v.values.proportion;
        });
        flatData.push(ptObj);
    });
    console.log(flatData);
    return flatData;
}
