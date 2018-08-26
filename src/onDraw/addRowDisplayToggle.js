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

    console.log(performance.now())

// var i;
// for (i = 0; i < expandable_rows[0].length; i++) {
//
// chart.rows.filter(
//         di =>
//             di.id.indexOf(expandable_rows[0][i].__data__.id + '|') > -1 &&
//             expandable_rows[0][i].__data__.id.split('|').length === di.id.split('|').length - 1
//     );
// }


// expandable_rows.each(function(d) {
//     d.children = chart.rows.filter(
//         di =>
//             di.id.indexOf(d.id + '|') > -1 &&
//             d.id.split('|').length === di.id.split('|').length - 1
//     );
//     console.log(d)
// });

console.log(performance.now())

console.log()

    // expandable_rows.each(function(d) {
    //     d.children = chart.rows.filter(
    //         di =>
    //             di.id.indexOf(d.id + '|') > -1 &&
    //             d.id.split('|').length === di.id.split('|').length - 1
    //     );
    // });


    console.log(performance.now())

    expandable_rows.on('click', function(d) {
        console.log('click');
        var row = d3.select(this.parentNode);
        var collapsed = !row.classed('chm-table-row--collapsed');

        row
            .classed('chm-table-row--collapsed', collapsed) //toggle the class
            .classed('chm-table-row--expanded', !collapsed); //toggle the class

            d.children = chart.rows.filter(
                  di =>
                      di.id.indexOf(d.id + '|') > -1 &&
                      d.id.split('|').length === di.id.split('|').length - 1
              );

        function iterativeCollapse(d) {



            if (d.children) {
                d.children
                    .classed('chm-hidden chm-table-row--collapsed', true)
                    .classed('chm-table-row--expanded', false);
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
