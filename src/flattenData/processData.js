export default function processData(data, settings, level) {
    const longData = [];
    data.forEach(d => {
        settings.value_cols.forEach(flag => {
            const newD = {};
            for (const key of Object.keys(d)) newD[key] = d[key];
            newD.flag = flag;
            //    newD.stat = d[flag];
            longData.push(newD);
        });
    });

    //make key variable for specified levels
    longData.forEach(function(d) {
        d.nestKey = '';
        settings.id_cols
            .filter(function(d, i) {
                return i < level;
            })
            .forEach(function(l, i) {
                d.nestKey = d.nestKey + ':' + d[l];
            });
        d.nestKey = '' + level + ':' + d.nestKey.slice(1);
    });

    //Nest data and calculate proportions
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
            // this needs to account for denominator in verified and signature

            console.log(
                v.filter(function(d) {
                    d.needs_signature == 1;
                }).length
            );
            if (v[0].flag == 'has_open_query' || v[0].flag == 'has_answered_query') {
                //want sums not proportions for query related variables
                return {
                    raw: v,
                    proportion: d3.sum(v, function(d) {
                        return d[d.flag];
                    })
                };
            } else if (v[0].flag == 'is_signed') {
                return {
                    raw: v,
                    proportion:
                        d3.sum(v, function(d) {
                            return d[d.flag];
                        }) /
                        v.filter(function(d) {
                            d.needs_signature == 1;
                        }).length
                };
            } else {
                return {
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

    /* THIS IS NEW */
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
    return flatData;
}
