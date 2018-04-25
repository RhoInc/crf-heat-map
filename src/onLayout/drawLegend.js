export default function drawLegend() {
    var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

    var heatLegend = this.wrap
        .insert('svg', ':first-child')
        .classed('legend', true)
        .attr('width', 500)
        .attr('height', 100)
        .selectAll('.legend')
        .data(colors)
        .enter();

    heatLegend
        .append('rect')
        .style({
            fill: function(d) {
                return d;
            },
            'fill-opacity': 1
        })
        .attr('width', 100)
        .attr('height', 20)
        .attr('x', function(d, i) {
            return 100 * i;
        })
        .attr('y', 40);

    //Information for Proportions
    heatLegend
        .append('text')
        .text(function(d, i) {
            if (i == 0) {
                return '0% of Forms';
            } else if (i == 2) {
                return '50%';
            } else if (i == 4) {
                return '100%';
            }
        })
        .attr('x', function(d, i) {
            return 100 * i;
        })
        .attr('y', 80);


    //Information for Queries (Sums)
    heatLegend
        .append('text')
        .text(function(d, i) {
            if (i == 0) {
                return '24';
            } else if (i == 2) {
                return '12';
            } else if (i == 4) {
                return '0 Queries*';
            }
        })
        .attr('x', function(d, i) {
            if (i == 4) {
                return 425;
            } else return 100 * (i + 1) - 17;
        })
        .attr('y', 30)


}
