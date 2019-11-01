import calculateStatistics from '../onInit/summarizeData/calculateStatistics';

export default function addStudySummary() {
    var tempChart = this;
    const fractions = this.controls.wrap
        .selectAll('.control-group')
        .filter(function(d) {
            return d.option === 'display_fractions';
        })
        .select('.changer')
        .property('checked');

    tempChart.data.initial_filtered.forEach(d => (d['id'] = 'Overall'));

    // calculate statistics across whole study
    const stats = calculateStatistics.call(tempChart, fractions);

    var summaryData = [
        {
            col: 'id',
            text: 'Overall'
        }
    ];

    // transform to proper format
    this.config.value_cols.forEach(function(value_col, index) {
        summaryData[index + 1] = {
            col: value_col.col,
            text: stats[0][value_col.col]
        };
    });

    // add study summary row to top of table and bind data
    this.tbody.insert('tr', ':first-child').classed('summary', true);

    this.tbody
        .select('tr')
        .selectAll('td')
        .data(summaryData)
        .enter()
        .append('td')
        .text(d => d.text);
}
