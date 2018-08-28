export default function addRowDisplayToggle() {
    var chart = this;
    var config = this.config;

    if (this.config.expand_all) {
        this.rows.classed('chm-hidden', false);
    }

    var rows = this.rows[0];

    chart.data.raw.forEach(function(d, i) {
        d['index'] = i;
    });

    var expandable_rows = this.rows
        .data(chart.data.raw)
        .filter(function(d) {
            return d.id.split('|').length < config.id_cols.length;
        })
        .select('td');

    var childNest = d3.nest();

    config.id_cols.slice(0, config.id_cols.length - 1).forEach(function(level) {
        childNest.key(d => d[level]);
    });

    var childLookup = childNest.rollup(d => d).map(chart.data.raw); //filtered_data?

    expandable_rows.on('click', function(d) {
        var row = d3.select(this.parentNode);
        var collapsed = !row.classed('chm-table-row--collapsed');

        row
            .classed('chm-table-row--collapsed', collapsed) //toggle the class
            .classed('chm-table-row--expanded', !collapsed); //toggle the class

        // this is not as elegant but is much faster and moves the burden off of draw to expanding, which is less important in large nests anyway
        // children are looked up in the nested dataset then row indices are used to grab the appropriate rows
        var children;
        function findChildren(d) {
            // handling the two-level nest and three-level nest separately for simplicity
            if (config.id_cols.length == 2) {
                children = childLookup[d[config.id_cols[0]]].map(
                    d => (d[config.id_cols[1]] ? rows[d['index']] : null)
                );
            } else if (config.id_cols.length == 3) {
                if (d[config.id_cols[1]]) {
                    children = childLookup[d[config.id_cols[0]]][d[config.id_cols[1]]].map(
                        d => (d[config.id_cols[2]] ? rows[d['index']] : null)
                    );
                } else {
                    children = [];
                    Object.keys(childLookup[d[config.id_cols[0]]]).forEach(function(key) {
                        var newKid = childLookup[d[config.id_cols[0]]][key][0];
                        newKid[config.id_cols[1]] ? children.push(newKid) : null;
                    });
                    children = children.map(d => rows[d['index']]);
                }
            }
        }

        if (collapsed) {
            findChildren(d); //hide the whole tree
            d3
                .selectAll(children)
                .classed('chm-hidden chm-table-row--collapsed', true)
                .classed('chm-table-row--expanded', false);
        } else {
            findChildren(d);
            d3.selectAll(children).classed('chm-hidden', false); //show just the immediate children
        }
    });
}
