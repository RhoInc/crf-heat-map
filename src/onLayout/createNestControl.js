import flattenData from '../flattenData';

export default function createNestControl() {
    const chart = this;
    const config = this.config;

    var idControlWrap = chart.controls.wrap.append('div').attr('class', 'control-group');
    idControlWrap
        .append('div')
        .attr('class', 'wc-control-label')
        .text('Show Status for:');
    var idNote = idControlWrap.append('div').attr('class', 'span-description');
    var idList = ['None', 'sitename', 'subjectnameoridentifier', 'foldername', 'formoid'];
    var idSelects = idControlWrap
        .selectAll('select')
        .data([0, 1, 2])
        .enter()
        .append('select');

    idSelects
        .selectAll('option')
        .data(
            d =>
                d === 0 // first dropdown shouldn't have "None" option
                    ? idList.filter(n => n !== 'None')
                    : idList
        )
        .enter()
        .append('option')
        .text(function(d) {
            return d;
        })
        .property('selected', function(d) {
            var levelNum = d3.select(this.parentNode).datum();
            return d == config.id_cols[levelNum];
        });

    idSelects.on('change', function() {
        var selectedLevels = [];
        idSelects.each(function(d, i) {
            selectedLevels.push(this.value);
        });

        var uniqueLevels = selectedLevels
            .filter(function(f) {
                return f != 'None';
            })
            .filter(function(item, pos) {
                return selectedLevels.indexOf(item) == pos;
            });

        config.id_cols = uniqueLevels;
        console.log(chart);
        chart.data.raw = flattenData.call(chart);
        chart.draw();
    });
}
