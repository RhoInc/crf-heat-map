d3.csv(
    'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/dataCleaning/dmc_DataPage.csv',
    //'./dmc_DataPage.csv', // to improve speed use local data file in development
    function(d) {
        return d;
    },
    function(error, data) {
        if (error)
            console.log(error);

        var instance = crfHeatMap(
            '#container'
        );

        instance.init(data);
    }
);

//Add button that toggles bootstrap styling.
const bootstrapToggle = d3.select('#title')
    .append('button')
    .attr('id', 'bootstrap-toggle')
    .style('float', 'right')
    .text('Enable bootstrap');
bootstrapToggle
    .on('click', function() {
        const bootstrap = d3.selectAll("link")
            .filter(function() {
                return /bootstrap.css/.test(this.href);
            });
        const disabled = bootstrap.property('disabled');
        bootstrap.property('disabled', !disabled);
        bootstrapToggle.text((disabled ? 'Disable' : 'Enable') + ' bootstrap');
    });
