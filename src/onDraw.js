export default function onDraw() {
    var chart = this;
    var config = this.config;

    var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];
    var colorsReversed = colors.slice().reverse();

    var colorScaleProp = d3.scale
        .quantile()
        .domain([0, 1])
        .range(colors);

    //Separate Color Scale for Queries
    var colorScaleSum = d3.scale
        .quantile()
        .domain([
            0,
            8,
            16,
            25,
            d3.max(chart.data.raw, function(d) {
                return d3.max([d.has_open_query, d.has_answered_query]); // this needs to be changed -> scale is not going to split it at 25!
            })
        ])
        .range(colorsReversed);

    var rows = this.tbody.selectAll('tr');
    var cells = rows
        .selectAll('td')
        .style('background', function(d) {
            if (d.col.includes('query')) {
                return colorScaleSum(d.text);
            } else return d.col == 'id' ? 'white' : colorScaleProp(d.text);
        })
        .text(function(d) {
            return d.col.includes('query') ? d.text : d3.format('0.1%')(d.text);
        });

    //format values cells
    cells
        .filter(function(d) {
            return d.col != 'id';
        })
        .style('text-align', 'center')
        .style('color', 'transparent')
        .style('width', '100px')
        .on('mouseover', function() {
            d3.select(this).style('color', function(d) {
                if (d.col.includes('query')) return +d.text > 16 ? 'black' : 'white';
                else return d.text > 0.5 ? 'white' : 'black';
            });
        })
        .on('mouseout', function() {
            d3.select(this).style('color', 'transparent');
        });

    //format id cells
    rows.each(function(d) {
        var labelVar = config.id_cols[d.level - 1];
        var label = d[labelVar];
        d3
            .select(this)
            .select('td')
            .text(label)
            .style('padding-left', function(d) {
                return d.level - 1 + 'em';
            });
    });

    //hide nested rows
    rows
        .filter(function(d) {
            return d.level > 1;
        })
        .style('display', 'none');

    var expandable_rows = rows
        .filter(function(d) {
            return d.level < config.id_cols.length;
        })
        .classed('collapsed', true)
        .select('td')
        .style('color', 'blue')
        .style('text-decoration', 'underline')
        .style('cursor', 'pointer');

    //get children for each row
    expandable_rows.each(function(d) {
        var matchVars = config.id_cols.filter(function(f, i) {
            return i <= d.level - 1;
        });

        d.children = rows.filter(function(r) {
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
        var collapsed = !row.classed('collapsed');

        row
            .classed('collapsed', collapsed) //toggle the class
            .classed('expanded', !collapsed); //toggle the class

        function iterativeCollapse(d) {
            if (d.children) {
                d.children.style('display', 'none');
                d.children.each(function(di) {
                    iterativeCollapse(di);
                });
            }
        }

        if (collapsed) {
            iterativeCollapse(d); //hide the whole tree
        } else {
            d.children.style('display', null); //show just the immediate children
        }
    });
}
