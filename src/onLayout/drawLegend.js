export default function drawLegend() {

    var chart = this;

    var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

    var legendHeight = 150
    var legendWidth = 600

    var rectHeight = 25
    var rectWidth = 120

    var heatLegend = this.wrap
        .insert('svg', ':first-child')
        .classed('legend', true)
        .attr('width', legendWidth)
        .attr('height', legendHeight)
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
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('x', function(d, i) {
            return rectWidth * i;
        })
        .attr('y', (legendHeight - rectHeight)/2);

    // Tick Labels for Top Axis (Sums)
    var topTextData = ['>24', '16-24', '8-16', '0-8','0']

    var topTextWidth = []

    //Information for Queries (Sums)
    d3.select("svg.legend").selectAll("text")
        .data(topTextData)
        .enter()
        .append("text")
        .text(d => d)
        .each(function(d,i) {  // need to account for the length of the words in the calculation of x
          var thisWidth = this.getComputedTextLength()
          topTextWidth.push(thisWidth)
        })
        .attr('x', function(d, i) {
            return rectWidth * (i+1) - topTextWidth[i]
        })
        .attr('y', ((legendHeight - rectHeight)/2) - 5)
        .append('svg:tspan')
        .attr('x', legendWidth - 80)
        .attr('dy', -20)
        .text("← Queries*")

    // Tick Labels for Bottom Axis (Proportions)
    var bottomTextData = ['0%-25%', '25%-50%', '50%-75%', '75%-100%','100%']

    //Information for Proportions
    d3.select("svg.legend").selectAll("g")
        .data(bottomTextData)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', function(d, i) {
          return rectWidth * i
        })
        .attr('y', ((legendHeight - rectHeight)/2) + rectHeight + 15)
        .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 20)
        .text("Forms →")




}
