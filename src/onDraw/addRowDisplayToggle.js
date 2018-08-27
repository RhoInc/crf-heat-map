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

    childNest.key(function(d) {
        return d[config.id_cols[0]];
    });

    var b = childNest.rollup(d => d).map(chart.data.raw); //filtered_data?

    expandable_rows.on('click', function(d) {
        console.log('click');
        var row = d3.select(this.parentNode);
        var collapsed = !row.classed('chm-table-row--collapsed');

        row
            .classed('chm-table-row--collapsed', collapsed) //toggle the class
            .classed('chm-table-row--expanded', !collapsed); //toggle the class

        var child
        function iterativeCollapse(d) {

         child = b[d[config.id_cols[0]]].map(d => (d[config.id_cols[1]] ? rows[d['index']] : null)) //grab the appropriate row from rows using index
          child.shift()
          console.log(child)
            if (child) {
                  d3.selectAll(child)
                    .classed('chm-hidden chm-table-row--collapsed', true)
                    .classed('chm-table-row--expanded', false);
                child.each(function(di) {
                    iterativeCollapse(di);
                });
            }
        }

        if (collapsed) {
            iterativeCollapse(d); //hide the whole tree
        } else {
          child = b[d[config.id_cols[0]]].map(d => (d[config.id_cols[1]] ? rows[d['index']] : null))
            d3.selectAll(child).classed('chm-hidden', false); //show just the immediate children
        }
    });
}
