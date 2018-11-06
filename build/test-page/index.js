if (window.origin !== 'https://rhoinc.github.io') {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '../crfHeatMap.js';
    head.appendChild(script);
}

d3.csv(
    //'https://rawgit.com/RhoInc/crf-heat-map/master/build/test-page/dmc_DataPage.csv',
    './dmc_DataPage.csv', // to improve speed use local data file in development
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
