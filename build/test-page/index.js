if (window.origin !== 'https://rhoinc.github.io') {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '../raveXplorer.js';
    head.appendChild(script);
}

d3.csv(
    'https://cdn.rawgit.com/RhoInc/rave-xplorer/master/build/test-page/rx_DataPage.csv',
    function(d) {
        return d;
    },
    function(error, data) {
        if (error)
            console.log(error);

        //HARDCODE BELOW//
        console.log('Thar be hardcodes here!');
        data = data.filter(function(d,i) { return !(i%10); });
        //HARDCODE ABOVE//

        var settings = {
            exports: ['csv', 'xlsx'],
        };
        var instance = raveXplorer(
            '#container',
            settings
        );

        instance.init(data);
    }
);
