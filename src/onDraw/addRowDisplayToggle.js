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
        var child_id =
            d.level +
            1 +
            config.id_cols
                .filter((id_col, i) => i <= d.level - 1)
                .map(matchVar => d[matchVar])
                .join(':') +
            ':';
        d.children = chart.rows.filter(d => d.id.indexOf(child_id) > -1);
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
