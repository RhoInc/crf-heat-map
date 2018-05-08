export default function drawLegend() {
    var chart = this;

    var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

    console.log(chart);

    var legendHeight = 60;
    var legendWidth = 1500;

    var rectHeight = 20;
    var rectWidth = 60;

    d3
        .selectAll('.wc-chart')
        .insert('svg', ':first-child')
        .classed('legend', true)
        .attr('width', legendWidth)
        //      .attr(x, 200)
        .attr('height', legendHeight)
        .selectAll('.legend')
        .data(colors)
        .enter()
        .append('rect')
        .style({
            fill: function(d) {
                return d;
            },
            'fill-opacity': 1
        })
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('x', function(d, i) {
            return rectWidth * i + 95;
        })
        .attr('y', (legendHeight - rectHeight) / 2);

    // Tick Labels for Top Axis (Sums)
    var topTextData = ['>24', '17-24', '9-16', '1-8', '0'];

    var topTextWidth = [];

    d3
        .select('svg.legend')
        .append('line') // attach a line
        .style('stroke', 'black') // colour the line
        .attr('x1', 90 + 160 * 5) // x position of the first end of the line
        .attr('y1', 15) // y position of the first end of the line
        .attr('x2', 90 + 160 * 5) // x position of the second end of the line
        .attr('y2', 60);

    //Information for Queries (Sums)
    d3
        .select('svg.legend')
        .selectAll('.legend')
        .data(colors)
        .enter()
        .append('rect')
        .style({
            fill: function(d) {
                return d;
            },
            'fill-opacity': 1
        })
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('x', function(d, i) {
            return rectWidth * i + (95 + 160 * 5);
        })
        .attr('y', (legendHeight - rectHeight) / 2);

    var bottomTextData = ['0%', '25%', '50%', '75%', '100%'];

    d3
        .select('svg.legend')
        .selectAll('g')
        .data(bottomTextData)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', function(d, i) {
            return rectWidth * i + 95;
        })
        .attr('y', (legendHeight - rectHeight) / 2 + rectHeight + 15)
        .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 20);

    // Tick Labels for Bottom Axis (Proportions)

    //Information for Proportions
    d3
        .select('svg.legend')
        .selectAll('g')
        .data(topTextData)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', function(d, i) {
            console.log(chart);
            console.log(d3.select('th.is_partial_entry'));
            return rectWidth * i + (95 + 160 * 5);
        })
        .attr('y', (legendHeight - rectHeight) / 2 + rectHeight + 15)
        .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 20);
    //      .text('Forms →');
}
