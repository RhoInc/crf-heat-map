import flattenData from './flattenData';

export default function onLayout() {
    var chart = this;
    var config = this.config;
    /*************************************
  / Custom Nest Control
  *************************************/
    var idControlWrap = this.controls.wrap.append('div').attr('class', 'control-group');
    idControlWrap
        .append('div')
        .attr('class', 'wc-control-label')
        .text('Show Status for:');
    var idNote = idControlWrap.append('div').attr('class', 'span-description');
    var idList = ['None', 'sitename', 'subjectnameoridentifier', 'foldername', 'formoid'];
    var idSelects = idControlWrap
        .selectAll('select')
        .data([0, 1, 2, 3])
        .enter()
        .append('select');

    idSelects
        .selectAll('option')
        .data(idList)
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
        console.log('you changed it');
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

        if (config.id_cols.length == 0) {
            idNote.text('Pick at least one level please!').style('color', 'red');
            chart.table.style('display', 'none');
        } else {
            idNote.text('');
            chart.table.style('display', null);
        }
        chart.data.raw = flattenData.call(chart);
        chart.draw();
    });

    /*************************************
  / Draw legend
  **************************************/
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
                return '0 Queries';
            }
        })
        .attr('x', function(d, i) {
            if (i == 4) {
                return 435;
            } else return 100 * (i + 1) - 17;
        })
        .attr('y', 30);
}
