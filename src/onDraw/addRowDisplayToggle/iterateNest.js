export default function iterateNest() {
    var chart = this;
    var config = this.config;

    // get all table rows
    var rows = this.rows[0];

    // get the highest id level
    var max_id_level = chart.config.id_cols.length - 2;

    // loop through levels of nest and develop a dictionary with children for parent keys
    // This will create an object with parent ids as the keys for the top level(s) and an array of child ids for the bottom level, allowing you to return the ids of the children of any row of data
    function iterateNest(d, id_level) {
        return d3
            .nest()
            .key(d => d[config.id_cols[id_level]])
            .rollup(function(rows) {
                if (id_level + 1 <= max_id_level) {
                    // if not top level then loop through and make sure it has children too
                    var obj = iterateNest(rows, id_level + 1);
                } else {
                    obj = {};
                }
                obj.ids = rows.filter(f => f.nest_level == id_level + 1).map(m => m.id);
                return obj;
            })
            .map(d);
    }

    return iterateNest(chart.data.summarized, 0);
}
