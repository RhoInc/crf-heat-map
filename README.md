# Rave Xplorer

The Ferdinand Magellan of Database Explorers

## Usage

The code to initialize the chart looks like this:

```javascript

    d3.csv('db_status_test.csv', function(data) {
        raveXplorer('body', {}).init(data);
    });
```

## Links
- [Interactive Example](https://rhoinc.github.io/rave-xplorer/build/test-page/) 
- [Configuration](https://github.com/RhoInc/rave-xplorer/wiki/Configuration)
