import createNestControl from './onLayout/createNestControl';
import drawLegend from './onLayout/drawLegend';
import flattenData from './flattenData';

function clone(obj) {
    let copy;

    //boolean, number, string, null, undefined
    if ('object' != typeof obj || null == obj) return obj;

    //date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    //array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    //object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error('Unable to copy [obj]! Its type is not supported.');
}

//import filter from './onLayout/filter';
function applyFilters() {
    //If there are filters, return a filtered data array of the raw data.
    //Otherwise return the raw data.

    this.data.filtered_ = this.filters  //need to make this unique for the if in flattenData
        ? clone(this.data.initial).filter(d => {
              let match = true;
              this.filters.forEach(filter => {
                  if (match === true && filter.val !== 'All')
                      match =
                          filter.val instanceof Array
                              ? filter.val.indexOf(d[filter.col]) > -1
                              : filter.val === d[filter.col];
              });
              return match;
          })
        : clone(this.data.initial);
}

export default function onLayout() {
    var table = this;
    var selects = this.controls.wrap.selectAll('select');


    selects.on('change', function() {
        // Get the selected levels
        var selectedfilterLevels = [];
        selects.each(function(d, i) {
            selectedfilterLevels.push(this.value);
        });

        // Update filters to reflect the selected levels
        table.filters.forEach(function(d, i) {
            d.val = selectedfilterLevels[i];
        });

        applyFilters.call(table);
        table.data.raw = flattenData.call(table);

        table.draw();
    });

    createNestControl.call(table);
    drawLegend.call(table);
}
