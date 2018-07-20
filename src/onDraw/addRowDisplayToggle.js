export default function addRowDisplayToggle() {
    var chart = this;
    var config = this.config;

    if (this.config.expand_all) {
        this.rows.classed('chm-hidden', false);
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
        var collapsed = !row.classed('chm-row--collapsed');

        row
            .classed('chm-row--collapsed', collapsed) //toggle the class
            .classed('chm-row--expanded', !collapsed); //toggle the class

        function iterativeCollapse(d) {
            if (d.children) {
                d.children
                    .classed('chm-hidden chm-row--collapsed', true)
                    .classed('chm-row--expanded', false);
                d.children.each(function(di) {
                    iterativeCollapse(di);
                });
            }
        }

        if (collapsed) {
            iterativeCollapse(d); //hide the whole tree
        } else {
            d.children.classed('chm-hidden', false); //show just the immediate children
        }
    });
}
