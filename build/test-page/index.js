if (window.origin !== 'https://rhoinc.github.io') {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '../crfHeatMap.js';
    head.appendChild(script);
}

d3.csv(
    './rx_DataPage.csv',
    //'https://rawgit.com/RhoInc/crf-heat-map/v1.0.0-dev/build/test-page/rx_DataPage.csv', // until master is set up
    function(d) {
        return d;
    },
    function(error, data) {
        if (error)
            console.log(error);

        var settings = {
            exports: ['csv', 'xlsx'],
        };
        var instance = crfHeatMap(
            '#container',
            settings
        );

        instance.init(data);
    }
);
