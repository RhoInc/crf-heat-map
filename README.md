# CRF Heat Map
The CRF Heat Map visualizes the level of completeness of a clinical database by aggregating case report form (CRF) characteristics, such as the rate of CRFs entered, frozen, and locked and the number of unresolved queries.
The heat map calculates these statistics within a set of clinical identifers including site, subject ID, visit, and CRF and colors cells by level of completeness.
For instance by default the data are summarized by Site and Subject ID:

![image](https://user-images.githubusercontent.com/5428548/43221882-48b9d23a-901c-11e8-9332-e0bc11984fd5.png)

The data are summarized by site and within each site by subject IDs related to that site.
Each site row is expandable and collapsable to show and hide the related subject ID rows.

![crf-heat-map-animation](https://user-images.githubusercontent.com/5428548/43276664-74a82376-90d3-11e8-8f5a-c11e7e5a94d9.gif)

The CRF Heat Map is fully interactive with user-defined summary combinations, data filters, column sliders, and data export.

## Usage
The code to initialize the chart looks like this:

```javascript
    d3.csv('rx_DataPage.csv', function(data) {
        crfHeatMap('body', {}).init(data);
    });
```

## Links
- [Interactive Example](https://rawgit.com/RhoInc/crf-heat-map/master/build/test-page/index.html)
- [Configuration](https://github.com/RhoInc/crf-heat-map/wiki/Configuration)
