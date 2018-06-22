export default function addRowDisplayToggle() {
    var chart = this;
    var config = this.config;

    if (this.config.expand_all) {
        this.rows.classed('row--hidden', false);
    }

    var expandable_rows = this.rows
        .filter(function(d) {
            return d.id.split('|').length < config.id_cols.length;
        })
        .select('td');

    //get children for each row
    expandable_rows.each(function(d) {
        d.children = chart.rows.filter(
            di =>
                di.id.indexOf(d.id + '|') > -1 &&
                d.id.split('|').length === di.id.split('|').length - 1
        );
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
