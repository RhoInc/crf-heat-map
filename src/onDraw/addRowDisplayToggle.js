export default function addRowDisplayToggle() {
    var chart = this;
    var config = this.config;

    if (this.config.expand_all) {
        this.rows.classed('chm-hidden', false);
    }

    var rows = this.rows[0];
    var max_id_level = chart.config.id_cols.length - 2;

    function iterateNest(d, id_level) {
        return d3
            .nest()
            .key(d => d[config.id_cols[id_level]])
            .rollup(function(rows) {
                if (id_level + 1 <= max_id_level) {
                    var obj = iterateNest(rows, id_level + 1);
                } else {
                    obj = {};
                }
                obj.ids = rows.filter(f => f.nest_level == id_level + 1).map(m => m.id);
                return obj;
            })
            .map(d);
    }

    var childNest = iterateNest(chart.data.raw, 0);

    var expandable_rows = this.rows
        .data(chart.data.raw)
        .filter(function(d) {
            return d.nest_level < config.id_cols.length;
        })
        .select('td');

    expandable_rows.on('click', function(d) {
        var row = d3.select(this.parentNode);
        var collapsed = !row.classed('chm-table-row--collapsed');

        row
            .classed('chm-table-row--collapsed', collapsed) //toggle the class
            .classed('chm-table-row--expanded', !collapsed); //toggle the class

        var currentNest = childNest;
        d.id.split('  |').forEach(function(level) {
            currentNest = currentNest[level];
        });
        var childIds;
        // when collapsing, if the nest's children have children, loop throough and build array with those included
        if (collapsed && Object.keys(currentNest).length > 1) {
            childIds = [];
            Object.keys(currentNest).forEach(function(level) {
                Object.values(currentNest[level]).length > 1 // handle different strctures
                    ? (childIds = childIds.concat(Object.values(currentNest[level])))
                    : (childIds = childIds.concat(Object.values(currentNest[level])[0]));
            });
        } else {
            childIds = currentNest.ids;
        }
        var rowChildren = chart.rows.filter(f => childIds.indexOf(f.id) > -1);
        if (collapsed) {
            rowChildren
                .classed('chm-hidden chm-table-row--collapsed', true)
                .classed('chm-table-row--expanded', false);
        } else {
            rowChildren.classed('chm-hidden', false); //show just the immediate children
        }
    });
}
