export default function addRowDisplayToggle() {
    var chart = this;
    var config = this.config;

    var expandable_rows = this.rows
        .filter(function(d) {
            return d.level < config.id_cols.length;
        })
        .select('td');

    //get children for each row
    expandable_rows.each(function(d) {
        console.log(d);
        var matchVars = config.id_cols.filter(function(f, i) {
            return i <= d.level - 1;
        });

        d.children = chart.rows.filter(function(r) {
            return r.level == d.level + 1;
        });

        matchVars.forEach(function(mv) {
            d.children = d.children.filter(function(r) {
                return d[mv] == r[mv];
            });
        });
    });

    expandable_rows.on('click', function(d) {
        var row = d3.select(this.parentNode);
        var collapsed = !row.classed('row--collapsed');

        row
            .classed('row--collapsed', collapsed) //toggle the class
            .classed('row--expanded', !collapsed); //toggle the class

        function iterativeCollapse(d) {
            if (d.children) {
                d.children
                    .classed('row--hidden row--collapsed', true)
                    .classed('row--expanded', false);
                d.children.each(function(di) {
                    iterativeCollapse(di);
                });
            }
        }

        if (collapsed) {
            iterativeCollapse(d); //hide the whole tree
        } else {
            d.children.classed('row--hidden', false); //show just the immediate children
        }
    });
}
