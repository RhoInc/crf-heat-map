# CRF Heat Map

The Ferdinand Magellan of Database Explorers

## Usage

The code to initialize the chart looks like this:

```javascript

    d3.csv('db_status_test.csv', function(data) {
        crfHeatMap('body', {}).init(data);
    });
```

## Links
- [Interactive Example](https://rawgit.com/RhoInc/crf-heat-map/master/build/test-page/index.html)
- [Configuration](https://github.com/RhoInc/crf-heat-map/wiki/Configuration)
