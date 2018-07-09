import { firstColumnWidth, otherColumnWidth, paddingRight, paddingLeft, legendWidth } from '../defineStyles';

export default function drawLegend() {
    // from https://stackoverflow.com/questions/24861073/detect-if-any-kind-of-ie-msie/24861307
    var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g); //check if browser is IE
    var crfColors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];
    var queryColors = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'];

    var legendHeight = 60;

    var rectHeight = 20;
    var rectWidth = 60;

    // these widths are from what's in defineStyles.js
    // might be way to pull these values from the classes setup there
    // or set them both upstream  -  for now just copy from there
    // had to slide this over slgihtly due to gridlines
    var heatCellWidth = otherColumnWidth + paddingRight + paddingLeft;
    isIE ? (heatCellWidth = heatCellWidth + 1.25) : (heatCellWidth = heatCellWidth + 2.25); // gridlines are little smaller in IE

    var legendSVG = this.containers.legend
        .append('svg')
        .classed('chm-legend-svg', true)
        .attr('width', legendWidth)
        .attr('height', legendHeight);

    // Form Legend
    legendSVG
        .selectAll('rect.chm-legend-rect--crf')
        .data(crfColors)
        .enter()
        .append('rect')
        .classed('chm-legend-rect chm-legend-rect--crf', true)
        .style({
            fill: function(d) {
                return d;
            },
            'fill-opacity': 1
        })
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('x', function(d, i) {
            return rectWidth * i;
        })
        .attr('y', (legendHeight - rectHeight) / 2);

    // Add Title
    legendSVG
        .append('text')
        .text('CRFs')
        .style({
            'font-weight': 'bold',
            'font-size': '17px'
        })
        .attr('x', 0)
        .attr('y', legendHeight - rectHeight - 25);

    var formTickLabels = ['0-25%', '25-50%', '50-75%', '75-99%', '100%'];

    legendSVG
        .selectAll('g')
        .data(formTickLabels)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', function(d, i) {
            return rectWidth * i;
        })
        .attr('y', (legendHeight - rectHeight) / 2 + rectHeight + 15);

    // Query Legend
    legendSVG
        .selectAll('rect.chm-legend-rect--query')
        .data(queryColors)
        .enter()
        .append('rect')
        .classed('chm-legend-rect chm-legend-rect--query', true)
        .style({
            fill: function(d) {
                return d;
            },
            'fill-opacity': 1
        })
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('x', function(d, i) {
            return rectWidth * i + heatCellWidth * 6;
        })
        .attr('y', (legendHeight - rectHeight) / 2);

    var queryTickLabels = ['>24', '17-24', '9-16', '1-8', '0'];

    legendSVG
        .selectAll('g')
        .data(queryTickLabels)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', function(d, i) {
            return rectWidth * i + heatCellWidth * 6;
        })
        .attr('y', (legendHeight - rectHeight) / 2 + rectHeight + 15);

    // Add Title
    legendSVG
        .append('text')
        .text('Queries')
        .style({
            'font-weight': 'bold',
            'font-size': '17px'
        })
        .attr('x', heatCellWidth * 6)
        .attr('y', legendHeight - rectHeight - 25);
}
