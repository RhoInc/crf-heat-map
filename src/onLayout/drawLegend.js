export default function drawLegend() {
    var chart = this;

    var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

    var legendHeight = 60;
    var legendWidth = 1500;

    var rectHeight = 20;
    var rectWidth = 60;

    // these widths are from what's in defineStyles.js
    // might be way to pull these values from the classes setup there
    // or set them both upstream  -  for now just copy from there
    var heatCellWidth = 150;
    var idCellWidth = 90;

    console.log();

    var legendSVG = d3
        .selectAll('.wc-chart')
        .insert('svg', ':first-child')
        .classed('legend', true)
        .attr('width', legendWidth)
        .attr('height', legendHeight);

    // Form Legend
    legendSVG
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
            return rectWidth * i + idCellWidth + 5;
        })
        .attr('y', (legendHeight - rectHeight) / 2);

    var formTickLabels = ['0%', '25%', '50%', '75%', '100%'];

    legendSVG
        .selectAll('g')
        .data(formTickLabels)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', function(d, i) {
            return rectWidth * i + idCellWidth + 5;
        })
        .attr('y', (legendHeight - rectHeight) / 2 + rectHeight + 15);

    // Query Legend
    legendSVG
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
            return rectWidth * i + (idCellWidth + 5 + (heatCellWidth + 10) * 5);
        })
        .attr('y', (legendHeight - rectHeight) / 2);

    var queryTickLabels = ['>24', '17-24', '9-16', '1-8', '0'];

    d3
        .select('svg.legend')
        .selectAll('g')
        .data(queryTickLabels)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', function(d, i) {
            return rectWidth * i + (idCellWidth + 5 + (heatCellWidth + 10) * 5);
        })
        .attr('y', (legendHeight - rectHeight) / 2 + rectHeight + 15);

    // Add dividing line next to query legend
    legendSVG
        .append('line') // attach a line
        .style('stroke', 'black') // colour the line
        .attr('x1', idCellWidth + (heatCellWidth + 10) * 5) // x position of the first end of the line
        .attr('y1', 15) // y position of the first end of the line
        .attr('x2', idCellWidth + (heatCellWidth + 10) * 5) // x position of the second end of the line
        .attr('y2', 60);
}
