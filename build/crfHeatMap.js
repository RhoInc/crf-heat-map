(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('webcharts')))
        : typeof define === 'function' && define.amd
            ? define(['webcharts'], factory)
            : (global.crfHeatMap = factory(global.webCharts));
})(this, function(webcharts) {
    'use strict';

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {
                if (target == null) {
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) {
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true
        });
    }

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, 'length')).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }

    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return -1.
                return -1;
            }
        });
    }

    var _typeof =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function(obj) {
                  return typeof obj;
              }
            : function(obj) {
                  return obj &&
                      typeof Symbol === 'function' &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? 'symbol'
                      : typeof obj;
              };

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        return Object(val);
    }

    function isObj(x) {
        var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);
        return x !== null && (type === 'object' || type === 'function');
    }

    function assignKey(to, from, key) {
        var val = from[key];

        if (val === undefined) {
            return;
        }

        if (hasOwnProperty.call(to, key)) {
            if (to[key] === undefined) {
                throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
            }
        }

        if (!hasOwnProperty.call(to, key) || !isObj(val)) to[key] = val;
        else if (val instanceof Array) to[key] = from[key];
        // figure out how to merge arrays without converting them into objects
        else to[key] = assign(Object(to[key]), from[key]);
    }

    function assign(to, from) {
        if (to === from) {
            return to;
        }

        from = Object(from);

        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                assignKey(to, from, key);
            }
        }

        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(from);

            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    assignKey(to, from, symbols[i]);
                }
            }
        }

        return to;
    }

    function merge(target) {
        target = toObject(target);

        for (var s = 1; s < arguments.length; s++) {
            assign(target, arguments[s]);
        }

        return target;
    }

    function calculateStatistics() {
        var _this = this;

        var onInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var context = this;

        // throw error if any query columns have denominators
        if (
            context.initial_config.value_cols.filter(function(a) {
                return a.denominator && a.type == 'queries';
            }).length != 0
        ) {
            throw "Query Columns are sums and should not have denominators. Check the renderer settings and verify that there are no columns with denominators in value_cols with the type 'queries'. ";
        }

        var crfsDenominator = context.initial_config.value_cols.filter(function(a) {
            return a.denominator && a.type == 'crfs';
        });

        var crfsNoDenominator = context.initial_config.value_cols.filter(function(a) {
            return !a.denominator && a.type == 'crfs';
        });

        var queries = context.initial_config.value_cols.filter(function(a) {
            return !a.denominator && a.type == 'queries';
        });

        //Nest data by the ID variable defined above and calculate statistics for each summary variable.
        var nest = d3
            .nest()
            .key(function(d) {
                return d.id;
            })
            .rollup(function(d) {
                //Define denominators.
                var summary = {
                    nForms: d.length
                };

                //calculate count for denominator
                crfsDenominator.forEach(function(c) {
                    return (summary['n' + c.denominator] = d.filter(function(di) {
                        return di[c.denominator] === '1';
                    }).length);
                });

                //Define summarized values, either rates or counts.
                context.initial_config.value_cols.forEach(function(value_col) {
                    var count = d3.sum(d, function(di) {
                        return di[value_col.col];
                    });
                    summary[value_col.col] =
                        crfsNoDenominator
                            .map(function(m) {
                                return m.col;
                            })
                            .indexOf(value_col.col) > -1
                            ? summary.nForms
                                ? count / summary.nForms
                                : 'N/A'
                            : crfsDenominator
                                  .map(function(m) {
                                      return m.col;
                                  })
                                  .indexOf(value_col.col) > -1
                                ? summary['n' + value_col.denominator]
                                    ? count / summary['n' + value_col.denominator]
                                    : 'N/A'
                                : queries
                                      .map(function(m) {
                                          return m.col;
                                      })
                                      .indexOf(value_col.col) > -1
                                    ? count
                                    : console.log('Missed one: ' + value_col.col);
                });
                summary.nest_level = d[0].nest_level;
                summary.parents = d[0].parents;
                summary.folder_ordinal = d[0].folder_ordinal;
                return summary;
            })
            .entries(this.data.initial_filtered);

        //Convert the nested data array to a flat data array.
        nest.forEach(function(d) {
            d.id = d.key;
            delete d.key;
            _this.config.value_cols.forEach(function(value_col) {
                d[value_col.col] = d.values[value_col.col];
            });
            d.nest_level = d.values.nest_level;
            d.parents = d.values.parents;
            d.folder_ordinal = d.values.folder_ordinal;

            delete d.values;
        });

        //Add summarized data to array of summaries.
        if (onInit) {
            this.data.summaries.push(nest);

            // build dictionary to look up type for each cell column and save to chart - going to use this freaking everywhere
            context.typeDict = d3
                .nest()
                .key(function(d) {
                    return d.col;
                })
                .rollup(function(rows) {
                    return rows[0].type;
                })
                .map(context.initial_config.value_cols);
        } else {
            return nest;
        }
    }

    function summarizeData() {
        var _this = this;

        var context = this;
        var t0 = performance.now();
        //begin performance test

        this.data.summaries = [];

        //Summarize data by each ID variable.
        this.config.id_cols.forEach(function(id_col, i) {
            //Define ID variable.  Each ID variable needs to capture the value of the previous ID variable(s).
            _this.data.initial_filtered.forEach(function(d) {
                d.nest_level = i;
                d.id = _this.config.id_cols
                    .slice(0, i + 1)
                    .map(function(id_col1) {
                        return d[id_col1];
                    })
                    .join('  |');

                d.parents = [];
                if (d.nest_level == 2) {
                    d.parents.push(
                        _this.config.id_cols
                            .slice(0, 2)
                            .map(function(id_col1) {
                                return d[id_col1];
                            })
                            .join('  |')
                    );
                }
                if (d.nest_level == 1) {
                    d.parents.push(
                        _this.config.id_cols
                            .slice(0, 1)
                            .map(function(id_col1) {
                                return d[id_col1];
                            })
                            .join('  |')
                    );
                }

                //  console.log(d)
            });

            calculateStatistics.call(_this);
        });

        // if there is a visit order column specificed in settings and it's present in the data use it to sort the folder rows
        if (
            this.initial_config.visit_order_col &&
            Object.keys(this.data.initial[0]).includes(this.initial_config.visit_order_col)
        ) {
            //Collapse array of arrays to array of objects.
            this.data.summarized = d3.merge(this.data.summaries).sort(function(a, b) {
                var visitIndex = context.config.id_cols.indexOf(context.initial_config.visit_col);
                if (visitIndex > -1) {
                    var aIds = a.id.split('  |');
                    var bIds = b.id.split('  |');
                    var i;
                    for (i = 0; i < context.config.id_cols.length; i++) {
                        if (aIds[i] === bIds[i]) {
                            continue;
                        } else {
                            // because the visit_order variable is numeric we want to treat it differently
                            if (i === visitIndex) {
                                return typeof aIds[i] == 'undefined'
                                    ? -1
                                    : parseFloat(a.folder_ordinal) < parseFloat(b.folder_ordinal)
                                        ? -1
                                        : 1;
                            } else {
                                return typeof aIds[i] === 'undefined'
                                    ? -1
                                    : aIds[i] < bIds[i]
                                        ? -1
                                        : 1;
                            }
                        }
                    }
                } else {
                    return a.id < b.id ? -1 : 1;
                }
            });
        } else {
            // otherwise sort alphabetically
            this.data.summarized = d3.merge(this.data.summaries).sort(function(a, b) {
                return a.id < b.id ? -1 : 1;
            });
        }

        //  this.data.raw = this.data.summarized;

        //end performance test
        var t1 = performance.now();
        console.log('Call to summarizeData took ' + (t1 - t0) + ' milliseconds.');
    }

    function update(filter) {
        var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var context = this;

        //update lower slider and annotation
        if (reset)
            filter.lowerSlider
                .attr({
                    min: filter.min,
                    max: filter.max
                })
                .property('value', filter.lower);
        filter.lowerAnnotation.text(
            '' +
                (context.typeDict[filter.variable] == 'crfs'
                    ? Math.round(filter.lower * 100)
                    : filter.lower) +
                (context.typeDict[filter.variable] == 'crfs' ? '%' : '')
        );

        //update upper slider and annotation
        if (reset)
            filter.upperSlider
                .attr({
                    min: filter.min,
                    max: filter.max
                })
                .property('value', filter.upper);
        filter.upperAnnotation.text(
            '' +
                (context.typeDict[filter.variable] == 'crfs'
                    ? Math.round(filter.upper * 100)
                    : filter.upper) +
                (context.typeDict[filter.variable] == 'crfs' ? '%' : '')
        );
    }

    function update$1(filter) {
        var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var context = this;

        //update lower input box
        if (reset)
            filter.lowerBox
                .attr({
                    min: filter.min,
                    max: function max(d) {
                        if (context.typeDict[d.variable] == 'crfs') {
                            return filter.max * 100;
                        } else {
                            return filter.upper;
                        }
                    }
                })
                .property('value', filter.lower);

        //update upper input box
        if (reset)
            filter.upperBox
                .attr({
                    min: filter.min,
                    max: function max(d) {
                        if (context.typeDict[d.variable] == 'crfs') {
                            return filter.max * 100;
                        } else {
                            return filter.upper;
                        }
                    }
                })
                .property('value', function(d) {
                    return context.typeDict[d.variable] == 'crfs'
                        ? filter.upper * 100
                        : filter.upper;
                });
    }

    function resetFilters() {
        var _this = this;

        this.columnControls.filters.forEach(function(filter) {
            //Update query maximum.
            if (filter.variable.indexOf('query') > -1) {
                filter.max = d3.max(_this.data.summarized, function(di) {
                    return di[filter.variable];
                });
            }
            //Reset upper and lower bounds.
            filter.lower = filter.min;
            filter.upper = filter.max;

            //Reset sliders.
            _this.initial_config.sliders
                ? update.call(_this, filter, true)
                : update$1.call(_this, filter, true);
        });
    }

    function redraw() {
        summarizeData.call(this);
        this.data.top = this.data.summarized.filter(function(d) {
            return d.parents.length == 0;
        });
        this.data.raw = this.data.top;
        resetFilters.call(this);
        this.draw(this.data.raw);
    }

    function createNestControls() {
        var context = this;
        var config = this.settings.synced;

        var idList = config.nestings.slice();
        idList.push({ value_col: undefined, label: 'None' });

        this.containers.nestControls
            .append('span')
            .attr('class', 'chm-control-label')
            .text('');
        var idNote = this.containers.nestControls.append('span').attr('class', 'span-description');
        var idSelects = this.containers.nestControls
            .selectAll('select')
            .data([0, 1, 2])
            .enter()
            .append('select')
            .classed('chm-nest-control', true)
            .attr({
                id: function id(d) {
                    return 'chm-nest-control--' + (d + 1);
                },
                title:
                    'These dropdowns control the attributes within which the CRF rates and query counts are aggregated.\n' +
                    'Each row in the table represents a combination of one or more of these attributes.'
            });

        idSelects
            .selectAll('option')
            .data(function(d) {
                return d === 0 // first dropdown shouldn't have "None" option
                    ? idList.filter(function(n) {
                          return n.value_col !== undefined;
                      })
                    : idList;
            })
            .enter()
            .append('option')
            .text(function(d) {
                return d.label;
            })
            .property('selected', function(d) {
                var levelNum = d3.select(this.parentNode).datum();
                return d.value_col == config.id_cols[levelNum];
            });

        idSelects.on('change', function() {
            //indicate loading
            context.containers.loading.classed('chm-hidden', false);

            var loading = setInterval(function() {
                var loadingIndicated = context.containers.loading.style('display') !== 'none';

                if (loadingIndicated) {
                    clearInterval(loading);
                    context.containers.loading.classed('chm-hidden', true);

                    //Capture the currently selected nesting variables.
                    var selectedLevels = [];
                    idSelects.each(function(d, i) {
                        var _this = this;

                        selectedLevels.push(
                            idList.filter(function(n) {
                                return n.label === _this.value;
                            })[0].value_col
                        );
                    });

                    //Remove duplicate nesting variables.
                    var uniqueLevels = selectedLevels
                        .filter(function(f) {
                            return f != undefined;
                        })
                        .filter(function(item, pos) {
                            return selectedLevels.indexOf(item) == pos;
                        });

                    //Update nesting variables.
                    context.table.config.id_cols = uniqueLevels;

                    //Summarize filtered data and redraw table.
                    redraw.call(context.table);
                }
            }, 25);
        });
    }

    function addTitle(container, text) {
        container
            .append('div')
            .classed('chm-legend-component chm-legend-title', true)
            .text(text);
    }

    function drawRects(container, data) {
        container
            .append('div')
            .classed('chm-legend-component chm-legend-blocks', true)
            .selectAll('div.chm-legend-block')
            .data(data)
            .enter()
            .append('div')
            .classed('chm-legend-div chm-legend-color-block', true)
            .style({
                background: function background(d) {
                    return d.color;
                },
                color: function color(d, i) {
                    return i < 3 ? 'black' : 'white';
                }
            })
            .text(function(d) {
                return d.label;
            });
    }

    function drawCrfLegend() {
        var crfData = [
            {
                label: '0-25%',
                color: '#eff3ff'
            },
            {
                label: '25-50%',
                color: '#bdd7e7'
            },
            {
                label: '50-75%',
                color: '#6baed6'
            },
            {
                label: '75-99%',
                color: '#3182bd'
            },
            {
                label: '100%',
                color: '#08519c'
            }
        ];
        addTitle(this.containers.crfLegend, 'CRFs');
        drawRects(this.containers.crfLegend, crfData);
    }

    function drawQueryLegend() {
        var queryData = [
            {
                label: '>24',
                color: '#edf8e9'
            },
            {
                label: '17-24',
                color: '#bae4b3'
            },
            {
                label: '9-16',
                color: '#74c476'
            },
            {
                label: '1-8',
                color: '#31a354'
            },
            {
                label: '0',
                color: '#006d2c'
            }
        ];
        addTitle(this.containers.queryLegend, 'Queries');
        drawRects(this.containers.queryLegend, queryData);
    }

    var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

    function defineLayout() {
        this.containers = {
            main: d3
                .select(this.element)
                .append('div')
                .attr('id', 'crf-heat-map')
        };

        // display warning message to user if they are using IE
        if (isIE) {
            this.containers.main
                .append('p')
                .style({ color: 'red', 'font-size': '20px', padding: '20px' })
                .text(
                    'Internet Explorer use is not recommended with the CRF Heat Map. You are likely to experience slower loading times.'
                );
        }

        /**-------------------------------------------------------------------------------------------\
        Left column
        \-------------------------------------------------------------------------------------------**/

        this.containers.leftColumn = this.containers.main
            .append('div')
            .classed('chm-column', true)
            .attr('id', 'chm-left-column');

        /***--------------------------------------------------------------------------------------\
          Row 1
        \--------------------------------------------------------------------------------------***/

        this.containers.leftColumnRow1 = this.containers.leftColumn
            .append('div')
            .classed('chm-row chm-row--1', true)
            .attr('id', 'chm-left-column-row-1');

        this.containers.dataExport = this.containers.leftColumnRow1
            .append('div')
            .classed('chm-section', true)
            .attr('id', 'chm-data-export');
        this.containers.leftColumnRow1
            .append('div')
            .classed('chm-label', true)
            .attr('id', 'chm-nest-label')
            .text('Summarize by:');
        this.containers.leftColumnRow1
            .append('div')
            .classed('chm-label', true)
            .attr('id', 'chm-controls-label')
            .text('');
        this.containers.loading = this.containers.leftColumnRow1
            .append('div')
            .attr('id', 'chm-loading')
            .text('Loading...');

        /***--------------------------------------------------------------------------------------\
          Row 2
        \--------------------------------------------------------------------------------------***/

        this.containers.leftColumnRow2 = this.containers.leftColumn
            .append('div')
            .classed('chm-row chm-row--2', true)
            .attr('id', 'chm-left-column-row-2');

        this.containers.controls = this.containers.leftColumnRow2
            .append('div')
            .classed('chm-section', true)
            .attr('id', 'chm-controls');

        /**-------------------------------------------------------------------------------------------\
        Right column
        \-------------------------------------------------------------------------------------------**/

        this.containers.rightColumn = this.containers.main
            .append('div')
            .classed('chm-column', true)
            .attr('id', 'chm-right-column');

        /***--------------------------------------------------------------------------------------\
          Row 1
        \--------------------------------------------------------------------------------------***/

        this.containers.rightColumnRow1 = this.containers.rightColumn
            .append('div')
            .classed('chm-row chm-row--1', true)
            .attr('id', 'chm-right-column-row-1');

        this.containers.nestControls = this.containers.rightColumnRow1
            .append('div')
            .classed('chm-section', true)
            .attr('id', 'chm-nest-controls');
        createNestControls.call(this);

        this.containers.legend = this.containers.rightColumnRow1
            .append('div')
            .classed('chm-section', true)
            .attr('id', 'chm-legend-container');

        this.containers.crfLegend = this.containers.legend
            .append('div')
            .classed('chm-legend', true)
            .attr('id', 'chm-crf-legend');
        drawCrfLegend.call(this);

        this.containers.queryLegend = this.containers.legend
            .append('div')
            .classed('chm-legend', true)
            .attr('id', 'chm-query-legend');
        drawQueryLegend.call(this);

        /***--------------------------------------------------------------------------------------\
          Row 2
        \--------------------------------------------------------------------------------------***/

        this.containers.rightColumnRow2 = this.containers.rightColumn
            .append('div')
            .classed('chm-row chm-row--2', true)
            .attr('id', 'chm-right-column-row-2');

        this.containers.table = this.containers.rightColumnRow2
            .append('div')
            .classed('chm-section', true)
            .attr('id', 'chm-table');
    }

    var firstColumnWidth = 16;
    var otherColumnWidth = 10.5;
    var paddingRight = 6;
    var paddingLeft = 6;

    function defineStyles() {
        // calculate how many crf & query columns there are to dynamically determine width of legend
        var queriesCount = this.settings.synced.value_cols.filter(function(a) {
            return a.type == 'queries';
        }).length;

        var crfsCount = this.settings.synced.value_cols.filter(function(a) {
            return a.type == 'crfs';
        }).length;

        // make single column legends little bigger to fit legend
        if (queriesCount == 1) {
            queriesCount = queriesCount + 0.5;
            crfsCount = crfsCount - 0.5;
        }

        if (crfsCount == 1) {
            crfsCount = crfsCount + 0.5;
            queriesCount = queriesCount - 0.5;
        }

        var styles = [
            'body {' + '    overflow-y: scroll;' + '}',
            'body #crf-heat-map {' +
                '    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;' +
                '    font-size: 16px;' +
                '    line-height: normal;' +
                '}',
            '#crf-heat-map {' + '}',
            '#crf-heat-map div {' + '    box-sizing: content-box;' + '}',
            '#crf-heat-map select {' + '    font-size: 12px;' + '}',
            '.chm-hidden {' + '    display: none !important;' + '}',
            '.chm-column {' + '    display: inline-block;' + '}',
            '.chm-column > * {' + '    width: 100%;' + '}',
            '.chm-row {' + '    display: inline-block;' + '}',
            '.summary {' + 'border-bottom:2px solid;' + '}',
            '.chm-row > * {' + '    display: inline-block;' + '}',
            '.chm-row--1 {' +
                '    height: 6em;' +
                '    padding-bottom: 10px;' +
                '    border-bottom: 1px solid lightgray;' +
                '    margin-bottom: 10px;' +
                '}',

            /***--------------------------------------------------------------------------------------\
          Left column
        \--------------------------------------------------------------------------------------***/

            '#chm-left-column {' +
                '    float: left;' +
                '    width: 19.4%;' +
                '    padding-right: .5%;' +
                '}',

            /****---------------------------------------------------------------------------------\
          Row 1 - Data Export
        \---------------------------------------------------------------------------------****/

            '#chm-left-column-row-1 {' + '    position: relative;' + '}',
            '#chm-loading {' +
                '    font-size: 24px;' +
                '    font-weight: bold;' +
                '    color: #045a8d;' +
                '}',
            '#chm-nest-label {' + '    float: right;' + '}',
            '#chm-controls-label {' +
                '    position: absolute;' +
                '    bottom: 0;' +
                '    width: 100%;' +
                '    text-align: center;' +
                '    vertical-align: bottom;' +
                '    font-size: 24px;' +
                '    font-weight: bold;' +
                '}',

            /****---------------------------------------------------------------------------------\
          Row 2 - Controls
        \---------------------------------------------------------------------------------****/

            '#chm-controls .wc-controls {' + '    margin-right: 10px;' + '}',
            '#chm-controls .control-group {' + '    width: 100%;' + '    margin: 0 0 5px 0;' + '}',
            '#chm-controls .control-group > * {' +
                '    display: inline-block !important;' +
                '    margin: 0;' +
                '}',
            '#chm-controls .wc-control-label {' +
                '    width: 58%;' +
                '    text-align: right;' +
                '}',
            '#chm-controls .span-description {' + '}',
            '#chm-controls select.changer {' +
                '    width: 40%;' +
                '    float: right;' +
                '    overflow-y: auto;' +
                '}',
            '#chm-controls input.changer {' + '    margin-left: 2% !important;' + '}',

            /***--------------------------------------------------------------------------------------\
          Right column
        \--------------------------------------------------------------------------------------***/

            '#chm-right-column {' +
                '    float: right;' +
                '    width: 79.4%;' +
                '    border-left: 1px solid lightgray;' +
                '    padding-left: .5%;' +
                '}',
            '#chm-right-column-row-1 > * {' + '    display: inline-block;' + '}',
            '#chm-right-column-row-2 > * {' + '}',

            /****---------------------------------------------------------------------------------\
          Nest controls
        \---------------------------------------------------------------------------------****/

            '#chm-nest-controls {' +
                ('    width: ' + firstColumnWidth + '%;') +
                '    height: 100%;' +
                '}',
            '.chm-nest-control {' +
                '    float: left;' +
                '    display: block;' +
                '    clear: left;' +
                ('    padding-left: ' + paddingLeft + 'px;') +
                '}',
            '#chm-nest-control--1 {' + '    margin-left: 0;' + '}',
            '#chm-nest-control--2 {' + '    margin-left: 1em;' + '}',
            '#chm-nest-control--3 {' + '    margin-left: 2em;' + '}',

            /****---------------------------------------------------------------------------------\
          Legend
        \---------------------------------------------------------------------------------****/

            '#chm-legend-container {' +
                ('    width: ' + (100 - firstColumnWidth) + '%;') +
                '    float: right;' +
                '    display: inline-block;' +
                '    height: 100%;' +
                '}',
            '.chm-legend {' + '    padding-top: 17px;' + '    display: inline-block;' + '}',
            '.chm-legend > * {' + '}',
            '#chm-crf-legend {' +
                '    float: left;' +
                ('    width: ' + 12.5 * crfsCount + '%;') +
                '}',
            '#chm-query-legend {' +
                '    float: right;' +
                ('    width: ' + 12.5 * queriesCount + '%;') +
                '}',
            '.chm-legend-title {' + '    font-size: 20px;' + '    font-weight: bold;' + '}',
            '#chm-query-legend .chm-legend-title {' + '    text-align: right;' + '}',
            '.chm-legend-div {' +
                '    display: inline-block;' +
                '    height: 20px;' +
                '    text-align: center;' +
                '    font-weight: bold;' +
                '    font-size: 14px;' +
                '}',
            '#chm-crf-legend .chm-legend-div {' + '    width: 20%;' + '}',
            '#chm-query-legend .chm-legend-div {' + '    width: 20%;' + '}',

            /****---------------------------------------------------------------------------------\
          Table
        \---------------------------------------------------------------------------------****/

            '#chm-table {' + '    width: 100%;' + '}',
            '#chm-table table {' + '    display: table;' + '}',
            '.wc-table {' + '    display: block;' + '}',
            '.wc-table table thead tr th {' + '    cursor: default;' + '}',
            '.wc-table table thead tr th,' +
                '.wc-table table tbody tr td {' +
                ('    padding-right: ' + paddingRight + 'px;') +
                ('    padding-left: ' + paddingLeft + 'px;') +
                '}',
            '.wc-table table thead tr th:first-child,' +
                '.wc-table table tbody tr td:first-child {' +
                ('    width: ' + firstColumnWidth + '% !important;') +
                '    text-align: left;' +
                '}',
            '.wc-table table thead tr:not(#column-controls) th:nth-child(n + 2),' +
                '.wc-table table tbody tr td:nth-child(n + 2) {' +
                ('    width: ' + otherColumnWidth + '% !important;') +
                '    text-align: left;' +
                '}',

            /* range sliders */

            '#column-controls th {' + '}',
            '.reset-button {' +
                '    width: 100%;' +
                '    font-weight: bold;' +
                '    font-size: 15px;' +
                '}',
            '.range-slider-container {' +
                '    position: relative;' +
                '    width: 100%;' +
                '    height: 30px;' +
                '}',
            '.range-slider {' +
                '    width: 100%;' +
                '    pointer-events: none;' +
                '    position: absolute;' +
                '    height: 15px;' +
                '    top: 1px;' +
                '    overflow: hidden;' +
                '    outline: none;' +
                '}',
            '.range-annotation {' +
                '    width: 100%;' +
                '    position: absolute;' +
                '    font-size: 12px;' +
                '    top: 16px;' +
                '    overflow: hidden;' +
                '    font-weight: normal;' +
                '}',
            '.range-annotation--lower {' + '    text-align: left;' + '}',
            '.range-annotation--upper {' +
                '    text-align: right;' +
                '    width: 50%;' +
                '    position: absolute;' +
                '    right: 0;' +
                '    bottom: 0;' +
                '}',
            '.range-slider::-webkit-slider-thumb {' +
                '    pointer-events: all;' +
                '    position: relative;' +
                '    z-index: 1;' +
                '    outline: 0;' +
                '}',
            '.range-slider::-moz-range-thumb {' +
                '    pointer-events: all;' +
                '    position: relative;' +
                '    z-index: 10;' +
                '    -moz-appearance: none;' +
                '    width: 9px;' +
                '}',
            '.range-slider::-moz-range-track {' +
                '    position: relative;' +
                '    z-index: -1;' +
                '    background-color: rgba(0, 0, 0, 1);' +
                '    border: 0;' +
                '}',
            '.range-slider::-moz-range-track {' +
                '    -moz-appearance: none;' +
                '    background: none transparent;' +
                '    border: 0;' +
                '}',
            '.range-slider::-moz-focus-outer {' + '    border: 0;' + '}',
            '.range-value-container {' + '    display: inline-block;' + '    width: 45%;' + '}',
            '.range-value-parent {' +
                'display: table-cell;' +
                '    position: relative;' +
                '    width: 100%;' +
                '  vertical-align: middle;' +
                '}',
            '.range-value-container > * {' + '    text-align: right;' + '}',
            '.range-value-container--lower {' + '    float: left;' + '}',
            '.range-value-container--upper {' + '    float: right;' + '}',
            '.range-value {' + '    width: 70%;' + '}',
            '.chm-text {' + '    font-size: 12px;' + '    font-weight: normal;' + '}',

            /* Table body rows */

            '.wc-table table tbody tr:hover td {' + '    border-bottom: 1px solid black;' + '}',
            '.wc-table table tbody tr:hover td:first-child {' +
                '    border-left: 1px solid black;' +
                '}',
            '.wc-table table tbody tr.grayParent td:not(:first-child) {' +
                '    background: #CCCCCC;' +
                '    color: black;' +
                '}',

            /* ID cells */

            '.chm-cell--id {' + '    background: white;' + '}',
            '.chm-table-row--expandable .chm-cell--id {' +
                '    color: blue;' +
                '    cursor: pointer;' +
                '    text-decoration: underline;' +
                '}',
            '.chm-cell--id--level2 {' + '    text-indent: 1em;' + '}',
            '.chm-cell--id--level3 {' + '    text-indent: 2em;' + '}',

            /* heat cells */

            '.chm-cell--heat {' +
                '    text-align: right;' +
                '    font-size: 12px;' +
                '    border: 1px solid white;' +
                '}',
            '.chm-cell--heat--level6,' +
                '.chm-cell--heat--level7,' +
                '.chm-cell--heat--level8,' +
                '.chm-cell--heat--level1,' +
                '.chm-cell--heat--level2,' +
                '.chm-cell--heat--level3 {' +
                '    color: black;' +
                '}',
            '.chm-cell--heat--level9,' +
                '.chm-cell--heat--level10,' +
                '.chm-cell--heat--level11,' +
                '.chm-cell--heat--level4,' +
                '.chm-cell--heat--level5 {' +
                '    color: white;' +
                '}',
            '.chm-cell--heat--level1 {' + '    background: #edf8e9;' + '}',
            '.chm-cell--heat--level2 {' + '    background: #bae4b3;' + '}',
            '.chm-cell--heat--level3 {' + '    background: #74c476' + '}',
            '.chm-cell--heat--level4 {' + '    background: #31a354;' + '}',
            '.chm-cell--heat--level5 {' + '    background: #006d2c;' + '}',
            '.chm-cell--heat--level6 {' + '    background: #eff3ff;' + '}',
            '.chm-cell--heat--level7 {' + '    background: #bdd7e7;' + '}',
            '.chm-cell--heat--level8 {' + '    background: #6baed6' + '}',
            '.chm-cell--heat--level9 {' + '    background: #3182bd;' + '}',
            '.chm-cell--heat--level10 {' + '    background: #08519c;' + '}',
            '.chm-cell--heat--level11 {' + '    background: #08519c;' + '    color: white;' + '}'
        ];

        //Attach styles to DOM.
        this.style = document.createElement('style');
        this.style.type = 'text/css';
        this.style.innerHTML = styles.join('\n');
        document.getElementsByTagName('head')[0].appendChild(this.style);
    }

    function rendererSettings() {
        return {
            site_col: 'sitename',
            id_col: 'subjectnameoridentifier',
            visit_col: 'folderinstancename',
            visit_order_col: 'folder_ordinal',
            form_col: 'ecrfpagename',
            id_freeze_col: 'subjfreezeflg',
            id_status_col: 'status',
            nestings: [
                {
                    settings_col: 'site_col',
                    value_col: null, // set in syncSettings()
                    label: 'Site',
                    default_nesting: true
                },
                {
                    settings_col: 'id_col',
                    value_col: null, // set in syncSettings()
                    label: 'Subject ID',
                    default_nesting: true
                },
                {
                    settings_col: 'visit_col',
                    value_col: null, // set in syncSettings(0
                    label: 'Folder',
                    default_nesting: false
                },
                {
                    settings_col: 'form_col',
                    value_col: null, // set in syncSettings()
                    label: 'Form',
                    default_nesting: false
                }
            ],
            value_cols: [
                {
                    col: 'is_partial_entry',
                    type: 'crfs',
                    label: 'Entered',
                    description: 'Data have been submitted in the EDC system.'
                },
                {
                    col: 'verified',
                    type: 'crfs',
                    denominator: 'needs_verification',
                    label: 'Source Data Verified',
                    description:
                        'All required fields have source data verification complete in EDC.'
                },
                {
                    col: 'ready_for_freeze',
                    type: 'crfs',
                    label: 'Ready for Freeze',
                    description:
                        'All required cleaning is complete (e.g. SDV, queries resolved) and data are ready to be frozen in EDC.'
                },
                {
                    col: 'is_frozen',
                    type: 'crfs',
                    label: 'Frozen',
                    description: 'Data have been frozen in the EDC system.'
                },
                {
                    col: 'is_signed',
                    type: 'crfs',
                    denominator: 'needs_signature',
                    label: 'Signed',
                    description: 'Data have been signed in the EDC system.'
                },
                {
                    col: 'is_locked',
                    type: 'crfs',
                    label: 'Locked',
                    description: 'Data have been locked in the EDC system.'
                },
                {
                    col: 'open_query_ct',
                    type: 'queries',
                    label: 'Open',
                    description: 'Site has not responded to issue.'
                },
                {
                    col: 'answer_query_ct',
                    type: 'queries',
                    label: 'Answered',
                    description: 'Site has responded to issue, DM needs to review.'
                }
            ],
            filter_cols: ['subset1', 'subset2', 'subset3'],
            display_cell_annotations: true,
            expand_all: false,
            sliders: false,
            max_rows_warn: 10000
        };
    }

    function webchartsSettings() {
        return {
            cols: null,
            headers: null, // set in rendererSettings
            applyCSS: true,
            searchable: false,
            sortable: false,
            pagination: false,
            exportable: true,
            exports: ['csv', 'xlsx'],
            dynamicPositioning: false
        };
    }

    function syncSettings(settings) {
        //Sync nestings with data variable settings.
        var settingsKeys = Object.keys(settings);
        var settingsCols = settingsKeys.filter(function(settingsKey) {
            return /_col$/.test(settingsKey);
        });
        settings.nestings.forEach(function(nesting) {
            nesting.value_col =
                nesting.value_col ||
                settings[
                    settingsCols.find(function(settingsCol) {
                        return settingsCol === nesting.settings_col;
                    })
                ];
        });

        // sort value_cols so that crfs come before query cols regardless of order in rendererSettings
        settings.value_cols.sort(function(a, b) {
            return a.type < b.type ? -1 : a.type > b.type ? 1 : 0;
        });

        //Define initial nesting variables.
        settings.id_cols = settings.nestings
            .filter(function(d) {
                return d.default_nesting === true;
            })
            .map(function(f) {
                return f.value_col;
            })
            .slice(0, 3);

        //Define table column variables.
        settings.cols = d3.merge([
            ['id'],
            settings.value_cols.map(function(d) {
                return d.col;
            })
        ]);

        //Define filter variables.
        settings.filter_cols = Array.isArray(settings.filter_cols)
            ? [settings.site_col, settings.id_freeze_col, settings.id_status_col].concat(
                  settings.filter_cols
              )
            : [settings.site_col, settings.id_freeze_col, settings.id_status_col];

        // add labels specified in rendererSettings as headers
        settings.headers = settings.value_cols.map(function(d) {
            return d.label;
        });

        // throw an error if there are more than 8 columns (due to current css set up)
        if (settings.headers.length > 8) {
            throw "A maximum of eight statistic columns is allowed. There are more than 8 value_col entries in rendererSettings currently. Don't be so greedy.";
        }

        //add ID header
        settings.headers.unshift('ID');

        return settings;
    }

    function controlInputs() {
        return [
            {
                type: 'checkbox',
                option: 'display_cell_annotations',
                label: 'Display Cell Annotations'
            },
            {
                type: 'checkbox',
                option: 'expand_all',
                label: 'Expand All'
            }
        ];
    }

    function syncControlInputs(settings) {
        var defaultControls = controlInputs();
        var labels = {};
        labels[settings.site_col] = 'Site';
        labels[settings.id_freeze_col] = 'Subject Freeze Status';
        labels[settings.id_status_col] = 'Subject Status';
        settings.filter_cols.forEach(function(filter_col, i) {
            var filter = {
                type: 'subsetter',
                value_col: filter_col,
                label: labels[filter_col]
                    ? labels[filter_col]
                    : /^subset\d$/.test(filter_col)
                        ? filter_col.replace(/^s/, 'S').replace(/(\d)/, ' $1')
                        : filter_col.label || filter_col.value_col || filter_col,
                multiple: filter_col == settings.id_status_col ? true : false
            };
            defaultControls.splice(i, 0, filter);
        });

        if (Array.isArray(settings.filters) && settings.filters.length > 0) {
            var otherFilters = settings.filters.map(function(filter) {
                var filterObject = {
                    type: 'subsetter',
                    value_col: filter.value_col || filter,
                    label: filter.label || filter.value_col || filter
                };
                return filterObject;
            });

            return defaultControls.concat(otherFilters);
        } else return defaultControls;
    }

    var configuration = {
        rendererSettings: rendererSettings,
        webchartsSettings: webchartsSettings,
        syncSettings: syncSettings,
        controlInputs: controlInputs,
        syncControlInputs: syncControlInputs
    };

    function onInit() {
        this.data.initial = this.data.raw;
        this.data.initial_filtered = this.data.initial;

        //Summarize raw data.
        summarizeData.call(this);

        this.data.top = this.data.summarized.filter(function(d) {
            return d.parents.length == 0;
        });

        this.data.raw = this.data.top;

        //Manually set controls' data to raw data.
        this.controls.data = this.data.initial;
        this.controls.ready = true;
    }

    function customizeFilters() {
        var context = this;

        //Redefine change event listener of filters.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.type === 'subsetter';
            })
            .each(function(d) {
                var dropdown = d3.select(this).select('.changer');

                dropdown.on('change', function(di) {
                    var _this = this;

                    //indicate loading
                    context.parent.containers.loading.classed('chm-hidden', false);

                    var loading = setInterval(function() {
                        var loadingIndicated =
                            context.parent.containers.loading.style('display') !== 'none';

                        if (loadingIndicated) {
                            clearInterval(loading);
                            context.parent.containers.loading.classed('chm-hidden', true);

                            //Update filter object.
                            context.filters.find(function(filter) {
                                return filter.col === di.value_col;
                            }).val = _this.multiple
                                ? dropdown
                                      .selectAll('option:checked')
                                      .pop()
                                      .map(function(d) {
                                          return d.textContent;
                                      })
                                : dropdown.selectAll('option:checked').text();

                            //Filter data.
                            context.data.initial_filtered = context.data.initial;
                            context.filters
                                .filter(function(filter) {
                                    return (
                                        filter.val !== 'All' &&
                                        !(
                                            Array.isArray(filter.val) &&
                                            filter.val.length === filter.choices.length
                                        )
                                    );
                                })
                                .forEach(function(filter) {
                                    context.data.initial_filtered = context.data.initial_filtered.filter(
                                        function(dii) {
                                            return Array.isArray(filter.val)
                                                ? filter.val.indexOf(dii[filter.col]) > -1
                                                : dii[filter.col] === filter.val;
                                        }
                                    );
                                });

                            //Summarize filtered data and redraw table.
                            redraw.call(context);
                        }
                    }, 25);
                });
            });
    }

    function tweakMultiSelects() {
        var context = this;

        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.type === 'subsetter' && d.multiple;
            })
            .each(function(d) {
                d3
                    .select(this)
                    .select('select')
                    .attr(
                        'size',
                        context.filters.find(function(filter) {
                            return filter.col === d.value_col;
                        }).choices.length
                    )
                    .attr('title', 'Hold the CTRL key to select or deselect a single option.')
                    .selectAll('option')
                    .property('selected', true);
            });
    }

    function customizeCheckboxes() {
        var context = this;

        //Redefine change event listener of Expand All checkbox.
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.option === 'expand_all';
            })
            .select('.changer')
            .on('change', function(d) {
                var changer_this = this;

                var confirmation = true;
                if (
                    changer_this.checked &&
                    context.data.summarized.length > context.initial_config.max_rows_warn
                ) {
                    confirmation = confirm(
                        'This will draw over ' +
                            String(context.initial_config.max_rows_warn) +
                            ' rows. Proceed?'
                    );
                }

                if (!confirmation) {
                    changer_this.checked = false;
                } else {
                    var loadingdiv = d3.select('#chm-loading'); // fix this later due to confirm box

                    loadingdiv.classed('chm-hidden', false);

                    var loading = setInterval(function() {
                        var loadingIndicated = loadingdiv.style('display') !== 'none';

                        if (loadingIndicated) {
                            clearInterval(loading);
                            loadingdiv.classed('chm-hidden', true);

                            context.config[d.option] = changer_this.checked;

                            if (changer_this.checked) {
                                context.data.raw = context.data.summarized;
                                // need to filter rows when expanding in case some input boxes are in use
                                if (context.columnControls.filtered) {
                                    context.data.raw = context.data.raw.filter(function(f) {
                                        return !f.filtered || f.visible_child;
                                    });
                                }
                                context.draw(context.data.raw);
                                context.expandable_rows.classed('chm-table-row--collapsed', false);
                                // I'm making the default when the chart is drawn to collapse all rows and (have the box unchecked)
                                // however I do want it to be checked when it's supposed to so flipping it back here
                                changer_this.checked = context.config[d.option];
                            } else {
                                context.draw(context.data.top);
                                context.expandable_rows.classed('chm-table-row--collapsed', true);
                            }
                        }
                    }, 25);
                }
                context.config[d.option] = changer_this.checked;
            });
    }

    function addResetButton(th, d) {
        var _this = this;

        var context = this;

        var resetText = this.initial_config.sliders ? 'Sliders' : 'Ranges';

        var resetButton = {};
        resetButton.container = d3
            .select(th)
            .append('div')
            .classed('reset-button-container', true);

        resetButton.button = resetButton.container
            .append('button')
            .classed('reset-button', true)
            .text('Reset ' + resetText)
            .on('click', function() {
                context.columnControls.filtered = false;
                resetFilters.call(_this);
                _this.draw(_this.data.top);
                _this.rows.classed('grayParent', false);
            });
        this.columnControls.resetButton = resetButton;
    }

    function layout(filter) {
        var context = this;

        //add containing div to header cell
        filter.div = filter.cell
            .append('div')
            .datum(filter)
            .classed('range-slider-container', true);

        //lower slider
        filter.lowerSlider = filter.div
            .append('input')
            .classed('range-slider filter-slider--lower', true)
            .attr({
                type: 'range',
                step: context.typeDict[filter.variable] == 'crfs' ? 0.01 : 1,
                min: 0
            });

        filter.lowerAnnotation = filter.div
            .append('span')
            .classed('range-annotation range-annotation--lower', true);

        //upper slider
        filter.upperSlider = filter.div
            .append('input')
            .classed('range-slider filter-slider--upper', true)
            .attr({
                type: 'range',
                step: context.typeDict[filter.variable] == 'crfs' ? 0.01 : 1,
                min: 0
            });
        filter.upperAnnotation = filter.div
            .append('span')
            .classed('range-annotation range-annotation--upper', true);
    }

    function filterData() {
        var _this = this;

        this.data.summarized.forEach(function(d) {
            d.filtered = false;
            d.visible_child = false;
        });

        //First, get all the rows that match the filters
        this.columnControls.filters.forEach(function(filter) {
            _this.data.summarized.forEach(function(d) {
                // filter N/As (as 100%) too
                if (d[filter.variable] == 'N/A' && +filter.upper < 1) {
                    d.filtered = true;
                } else {
                    var filtered_low = +d[filter.variable] < +filter.lower;
                    var filtered_high = +d[filter.variable] > +filter.upper;
                    //filtered_missing = d[filter.variable] === 'N/A'
                    if (filtered_low || filtered_high) {
                        d.filtered = true;
                    }
                }
            });
        });

        //now, identify hidden parent rows that have visible rowChildren
        //for rows that are visible (filtered = false)
        var visible_row_parents = this.data.summarized
            .filter(function(f) {
                return !f.filtered;
            })
            .map(function(f) {
                return f.parents;
            });
        var unique_visible_row_parents = d3.set(d3.merge(visible_row_parents)).values();

        //identifiy the parent rows
        this.data.raw = this.data.summarized.map(function(m) {
            m.visible_child = unique_visible_row_parents.indexOf(m.id) > -1;
            return m;
        });

        this.data.raw = this.data.raw.filter(function(d) {
            return d.parents.length == 0;
        }); // only want to draw top level;

        this.data.raw = this.data.raw.filter(function(f) {
            return !f.filtered || f.visible_child;
        });
    }

    function onInput(filter) {
        var context = this;

        //Attach an event listener to Sliders
        filter.sliders = filter.div.selectAll('.range-slider').on('change', function(d) {
            var _this = this;

            var loadingdiv = d3.select('#chm-loading');

            loadingdiv.classed('chm-hidden', false);

            var loading = setInterval(function() {
                var loadingIndicated = loadingdiv.style('display') !== 'none';

                if (loadingIndicated) {
                    clearInterval(loading);
                    loadingdiv.classed('chm-hidden', true);

                    var sliders = _this.parentNode.getElementsByTagName('input');
                    var slider1 = parseFloat(sliders[0].value);
                    var slider2 = parseFloat(sliders[1].value);

                    if (slider1 <= slider2) {
                        d.lower = slider1;
                        d.upper = slider2;
                    } else {
                        d.lower = slider2;
                        d.upper = slider1;
                    }

                    context.columnControls.filtered = true;
                    update.call(context, d);
                    filterData.call(context);
                    context.draw(context.data.raw);
                }
            }, 25);
        });

        filter.sliders = filter.div.selectAll('.range-slider').on('input', function(d) {
            var sliders = this.parentNode.getElementsByTagName('input');
            var slider1 = parseFloat(sliders[0].value);
            var slider2 = parseFloat(sliders[1].value);

            if (slider1 <= slider2) {
                d.lower = slider1;
                d.upper = slider2;
            } else {
                d.lower = slider2;
                d.upper = slider1;
            }

            update.call(context, d);
        });

        //allow users to change filter settings by editing text annotations - not handling the flip case for simplicity
        filter.upperAnnotation.attr('contenteditable', true).on('blur', function(d) {
            d.upper =
                context.typeDict[filter.variable] == 'crfs'
                    ? parseFloat(this.textContent) / 100
                    : parseFloat(this.textContent);
            context.columnControls.filtered = true;
            filter.upperSlider.property('value', d.upper);
            filterData.call(context);
            context.draw(context.data.raw);
        });

        filter.lowerAnnotation.attr('contenteditable', true).on('blur', function(d) {
            d.lower =
                context.typeDict[filter.variable] == 'crfs'
                    ? parseFloat(this.textContent) / 100
                    : parseFloat(this.textContent);
            context.columnControls.filtered = true;
            filter.lowerSlider.property('value', d.lower);
            filterData.call(context);
            context.draw(context.data.raw);
        });
    }

    function layout$1(filter) {
        var context = this;

        //add containing div to header cell
        filter.div = filter.cell
            .append('div')
            .datum(filter)
            .classed('range-value-parent', true);

        var rangeValueLowerDiv = filter.div
            .append('div')
            .classed('range-value-container range-value-container--lower', true);

        //lower Input Box
        filter.lowerBox = rangeValueLowerDiv
            .append('input')
            .classed('range-value filter-value--lower', true)
            .attr({
                type: 'number',
                min: 0,
                step: 1,
                value: 0
            });

        rangeValueLowerDiv
            .append('span')
            .classed('chm-text', true)
            .text(function(d) {
                return context.typeDict[d.variable] == 'crfs' ? '%' : '';
            });

        filter.div
            .append('span')
            .classed('chm-dash', true)
            .text(function(d) {
                return ' - ';
            });

        var rangeValueUpperDiv = filter.div
            .append('div')
            .classed('range-value-container range-value-container--upper', true);

        //upper Input Box
        filter.upperBox = rangeValueUpperDiv
            .append('input')
            .classed('range-value filter-value--upper', true)
            .attr({
                type: 'number',
                min: 0,
                step: 1,
                value: 100
            });

        rangeValueUpperDiv
            .append('span')
            .classed('chm-text', true)
            .text(function(d) {
                return context.typeDict[d.variable] == 'crfs' ? '%' : '';
            });
    }

    function onInput$1(filter) {
        var context = this;

        //Attach an event listener to Input Boxes.
        filter.inputBoxes = filter.div.selectAll('.range-value').on('change', function(d) {
            var _this = this;

            var loadingdiv = d3.select('#chm-loading');

            loadingdiv.classed('chm-hidden', false);

            var loading = setInterval(function() {
                var loadingIndicated = loadingdiv.style('display') !== 'none';

                if (loadingIndicated) {
                    clearInterval(loading);
                    loadingdiv.classed('chm-hidden', true);

                    var boxes = _this.parentNode.parentNode.getElementsByTagName('input');
                    var box1 = parseFloat(boxes[0].value);
                    var box2 = parseFloat(boxes[1].value);

                    if (box1 <= box2) {
                        if (context.typeDict[d.variable] == 'crfs') {
                            d.lower = box1 / 100;
                            d.upper = box2 / 100;
                        } else {
                            d.lower = box1;
                            d.upper = box2;
                        }
                    } else {
                        if (context.typeDict[d.variable] == 'crfs') {
                            d.lower = box2 / 100;
                            d.upper = box1 / 100;
                        } else {
                            d.lower = box2;
                            d.upper = box1;
                        }
                    }
                    context.columnControls.filtered = true;
                    update$1.call(context, d);
                    filterData.call(context);
                    context.draw(context.data.raw);
                }
            }, 25);
        });
    }

    function addSliders(th, d) {
        //Define layout of header cells.
        var filter = this.columnControls.filters.find(function(filter) {
            return filter.variable === d;
        });
        filter.cell = d3.select(th);

        //Lay out, initialize, and define event listeners for column filter.
        if (this.initial_config.sliders) {
            layout.call(this, filter);
            update.call(this, filter, true);
            onInput.call(this, filter);
        } else {
            layout$1.call(this, filter);
            update$1.call(this, filter, true);
            onInput$1.call(this, filter);
        }
    }

    function addColumnControls() {
        var _this = this;

        var context = this;

        //Define custom column controls object.
        this.columnControls = {
            header: this.thead.append('tr').attr('id', 'column-controls'),
            filters: this.config.cols
                .filter(function(d) {
                    return d !== 'id';
                })
                .map(function(variable) {
                    var filter = {
                        variable: variable,
                        min: 0,
                        lower: 0,
                        max:
                            context.typeDict[variable] == 'crfs'
                                ? 1
                                : d3.max(_this.data.raw, function(di) {
                                      return di[variable];
                                  })
                    };
                    filter.upper = filter.max;

                    return filter;
                })
        };

        //Add cells to header.
        this.columnControls.cells = this.columnControls.header
            .selectAll('th')
            .data(this.config.cols)
            .enter()
            .append('th')
            .each(function(d) {
                if (d === 'id') addResetButton.call(context, this);
                else addSliders.call(context, this, d);
            });
    }

    function onLayout() {
        customizeFilters.call(this);
        tweakMultiSelects.call(this);
        customizeCheckboxes.call(this);
        //moveExportButtons.call(this);
        addColumnControls.call(this);
    }

    function customizeRows(chart, rows) {
        rows
            .classed('chm-table-row', true)
            .classed('chm-table-row--expandable', function(d) {
                return d.id.split('  |').length < chart.config.id_cols.length;
            })
            .classed('chm-table-row--collapsed', function(d) {
                return d.id.split('  |').length < chart.config.id_cols.length;
            });
    }

    function addStudySummary() {
        var tempChart = this;

        tempChart.data.initial_filtered.forEach(function(d) {
            return (d['id'] = 'Overall');
        });

        // calculate statistics across whole study
        var stats = calculateStatistics.call(tempChart, false);

        var summaryData = [
            {
                col: 'id',
                text: 'Overall'
            }
        ];

        // transform to proper format
        this.config.value_cols.forEach(function(value_col, index) {
            summaryData[index + 1] = {
                col: value_col.col,
                text: stats[0][value_col.col]
            };
        });

        // add study summary row to top of table and bind data
        this.tbody.insert('tr', ':first-child').classed('summary', true);

        this.tbody
            .select('tr')
            .selectAll('td')
            .data(summaryData)
            .enter()
            .append('td')
            .text(function(d) {
                return d.text;
            });
    }

    function customizeCells(chart, cells) {
        cells
            .attr('class', function(d) {
                var cellClass = 'chm-cell';

                if (d.col === 'id')
                    cellClass =
                        cellClass +
                        ' chm-cell--id' +
                        ' chm-cell--id--level' +
                        d.text.split('  |').length;
                else {
                    cellClass = cellClass + ' chm-cell--heat';
                    var level = void 0;
                    if (chart.typeDict[d.col] == 'queries')
                        level =
                            d.text === 0
                                ? 5
                                : d.text < 9
                                    ? 4
                                    : d.text < 17
                                        ? 3
                                        : d.text < 25
                                            ? 2
                                            : 1;
                    else
                        level =
                            d.text === 'N/A'
                                ? 11
                                : d.text === 1
                                    ? 10
                                    : d.text > 0.75
                                        ? 9
                                        : d.text > 0.5
                                            ? 8
                                            : d.text > 0.25
                                                ? 7
                                                : 6;
                    cellClass = cellClass + ' chm-cell--heat--level' + level;
                }

                return cellClass;
            })
            .text(function(d) {
                return d.col === 'id'
                    ? d.text.split('  |')[d.text.split('  |').length - 1]
                    : chart.typeDict[d.col] == 'crfs'
                        ? d.text === 'N/A'
                            ? d.text
                            : String(Math.floor(d.text * 100)) + '%'
                        : d.text;
            });
    }

    function addInfoBubbles() {
        var chart = this;

        // add info bubbles and either info text, if defined, or the name of variable
        chart.wrap
            .select('tr')
            .selectAll('th:not(.id)')
            .data(chart.initial_config.value_cols)
            .append('span')
            .html(' &#9432')
            .attr('title', function(d) {
                return d.description;
            });
    }

    function iterateNest() {
        var chart = this;
        var config = this.config;

        // get all table rows
        var rows = this.rows[0];

        // get the highest id level
        var max_id_level = chart.config.id_cols.length - 2;

        // loop through levels of nest and develop a dictionary with children for parent keys
        // This will create an object with parent ids as the keys for the top level(s) and an array of child ids for the bottom level, allowing you to return the ids of the children of any row of data
        function iterateNest(d, id_level) {
            return d3
                .nest()
                .key(function(d) {
                    return d[config.id_cols[id_level]];
                })
                .rollup(function(rows) {
                    if (id_level + 1 <= max_id_level) {
                        // if not top level then loop through and make sure it has children too
                        var obj = iterateNest(rows, id_level + 1);
                    } else {
                        obj = {};
                    }
                    obj.ids = rows
                        .filter(function(f) {
                            return f.nest_level == id_level + 1;
                        })
                        .map(function(m) {
                            return m.id;
                        });
                    return obj;
                })
                .map(d);
        }

        return iterateNest(chart.data.summarized, 0);
    }

    function flagParentRows() {
        this.rows.classed('grayParent', function(d) {
            return d.filtered && d.visible_child;
        });
    }

    function onClick(d, chart) {
        var row = d3.select(this);

        var collapsed = !row.classed('chm-table-row--collapsed');

        // ensure that you don't collapse an already collapsed row or expand an already expanded one
        row
            .classed('chm-table-row--collapsed', collapsed) //toggle the class
            .classed('chm-table-row--expanded', !collapsed); //toggle the class

        // subset the nested child dictionary to create an object with only the ids for the children of the current row
        var currentNest = chart.childNest;
        d.id.split('  |').forEach(function(level) {
            currentNest = currentNest[level];
        });

        var childIds;
        // when collapsing, if the nest's children have children, loop through and build array with those ids included
        if (collapsed && Object.keys(currentNest).length > 1) {
            childIds = [];
            Object.keys(currentNest).forEach(function(level) {
                Object.values(currentNest[level]).length > 1 // handle different strctures
                    ? (childIds = childIds.concat(Object.values(currentNest[level])))
                    : (childIds = childIds.concat(Object.values(currentNest[level])[0]));
            });
        } else {
            childIds = currentNest.ids;
        }

        if (collapsed) {
            // get an array of the html rows that are children of the current row
            var rowChildren = chart.rows.filter(function(f) {
                return childIds.indexOf(f.id) > -1;
            });
            // remove those rows
            rowChildren.remove();
        } else {
            // get the data for the child rows as an array
            var childrenData = chart.data.summarized.filter(function(a) {
                return childIds.includes(a.id) && (a.filtered != true || a.visible_child);
            });

            // assign a class to the selected row to perform the trick below
            row.classed('selected', true);

            // repeating *s to place children after their parent in the correct order
            childrenData.forEach(function(childData, i) {
                return chart.tbody
                    .insert('tr', '.selected' + ' + *'.repeat(i + 1))
                    .classed('chm-table-row', true)
                    .classed('children', true)
                    .datum(childData)
                    .classed('chm-table-row--collapsed', true);
            });

            // grab all the new child rows
            var childrenRows = d3.selectAll('.children');

            // transform data to required format
            var childrenCells = childrenRows.selectAll('td').data(function(d) {
                return chart.config.cols.map(function(key) {
                    return { col: key, text: d[key] };
                });
            });

            // add cells with text to new rows
            childrenCells
                .enter()
                .append('td')
                .text(function(d) {
                    return d.text;
                });

            // update chart rows property to include newly added rows
            chart.rows = chart.tbody.selectAll('tr');

            // add the newly drawn rows to the array of clickable rows
            chart.expandable_rows = chart.rows.filter(function(d) {
                return d.nest_level < chart.config.id_cols.length - 1;
            });

            // remove temporary classes
            childrenRows.classed('children', false);
            row.classed('selected', false);

            // apply coloring based on filters
            flagParentRows.call(chart);

            // add on click functionality to new children too
            chart.expandable_rows.on('click', function(d) {
                onClick.call(this, d, chart);
            });

            // apply styling
            customizeRows(chart, childrenRows);

            customizeCells(chart, childrenCells);
        }
    }

    function addRowDisplayToggle() {
        var chart = this;
        var config = this.config;

        // this is a nested object with parent ids as the keys and child ids as the "values"
        chart.childNest = iterateNest.call(this);

        // get all of the clickable rows
        chart.expandable_rows = this.rows.filter(function(d) {
            return d.nest_level < config.id_cols.length - 1;
        });

        chart.expandable_rows.on('click', function(d) {
            onClick.call(this, d, chart);
        });
    }

    function toggleCellAnnotations() {
        if (!this.config.display_cell_annotations) {
            this.cells
                .filter(function(d) {
                    return d.col !== 'id' && !d.hasOwnProperty('id');
                })
                .style('color', 'transparent')
                .on('mouseover', function() {
                    var level = +this.className.replace(/(.*)(level)(\d+)(.*)/, '$3');
                    this.style.color = [6, 7, 8, 1, 2, 3].indexOf(level) > -1 ? 'black' : 'white';
                })
                .on('mouseout', function() {
                    this.style.color = 'transparent';
                });
        }
    }

    function deriveData() {
        var _this = this;

        var table = this;
        this.export = {
            nests: this.config.id_cols.map(function(id_col, i) {
                return 'Nest ' + (i + 1) + ': ' + id_col;
            }),
            filters: this.filters.map(function(filter) {
                return _this.controls.config.inputs.find(function(input) {
                    return input.value_col === filter.col;
                }).label;
            })
        };

        //Define headers.
        this.export.headers = d3.merge([this.export.nests, this.config.headers.slice(1)]);

        //Define columns.
        this.export.cols = d3.merge([this.export.nests, this.config.cols.slice(1)]);

        var subject_id_col_index = this.config.id_cols.indexOf(this.config.id_col);
        var subject_id_col = subject_id_col_index > -1;

        //Capture subject-level information.
        if (subject_id_col) {
            //Add headers.
            this.export.headers.push('Site', 'Subject Status', 'Subject Freeze Status');

            //Add columns.
            this.export.cols.push('site', 'status', 'freeze');

            // build look up for subject
            var subjects = d3
                .set(
                    table.data.initial.map(function(d) {
                        return d[_this.config.id_col];
                    })
                )
                .values();
            var subjectMap = subjects.reduce(function(acc, cur) {
                var subjectDatum = _this.data.initial.find(function(d) {
                    return d[_this.config.id_col] === cur;
                });
                acc[cur] = {
                    site: subjectDatum[_this.config.site_col],
                    status: subjectDatum[_this.config.id_status_col],
                    freeze: subjectDatum[_this.config.id_freeze_col]
                };
                return acc;
            }, {});
        }

        // Going to want expanded data - since current data
        this.export.data = this.data.summarized;
        // need to filter rows when expanding in case some input boxes are in use
        if (this.columnControls.filtered) {
            table.export.data = table.export.data.filter(function(f) {
                return !f.filtered || f.visible_child;
            });
        }

        //Define data.
        this.export.data.forEach(function(d, i, thisArray) {
            //Split ID variable into as many columns as nests currently in place.
            _this.export.nests.forEach(function(id_col, j) {
                var id_val = d.id.split('  |')[j];
                d[id_col] = id_val || 'Total';
            });

            // Now "join" subject level information to export data
            if (subject_id_col) {
                var subjectID =
                    d['Nest ' + (subject_id_col_index + 1) + ': ' + _this.config.id_col];
                Object.assign(d, subjectMap[subjectID]);
            }
        });

        //Remove total rows.
        this.export.data = this.export.data.filter(function(d) {
            return !_this.export.nests.some(function(nest) {
                return d[nest] === 'Total';
            });
        });
    }

    function csv() {
        var _this = this;

        var context = this;
        var value_cols = this.config.value_cols.map(function(d) {
            return d.col;
        });
        var CSVarray = [];

        var table = this;

        //add filters info after last column - similar second tab of xlsx
        this.export.headers.push('Filter', 'Value');
        this.export.cols.push('Filter', 'Value');

        this.export.data.forEach(function(d, i) {
            d['Filter'] = '';
            d['Value'] = '';
        });

        this.filters.forEach(function(filter, i) {
            if (i < _this.export.data.length) {
                table.export.data[i]['Filter'] = filter.col;
                table.export.data[i]['Value'] =
                    Array.isArray(filter.val) && filter.val.length < filter.choices.length
                        ? filter.val.join(', ')
                        : Array.isArray(filter.val) && filter.val.length === filter.choices.length
                            ? 'All'
                            : filter.val;
            } else
                table.export.data.push(
                    Object.assign(
                        _this.export.cols.reduce(function(acc, cur) {
                            acc[cur] = '';
                            return acc;
                        }, {}),
                        {
                            Filter: filter.col,
                            Value: filter.val
                        }
                    )
                );
        });

        //header row
        CSVarray.push(
            this.export.headers.map(function(header) {
                return '"' + header.replace(/"/g, '""') + '"';
            })
        );

        //data rows
        this.export.data.forEach(function(d) {
            //add rows to CSV array
            var row = _this.export.cols.map(function(col, i) {
                var value =
                    value_cols.indexOf(col) > -1 &&
                    context.typeDict[col] == 'crfs' &&
                    ['N/A', ''].indexOf(d[col]) < 0
                        ? Math.floor(d[col] * 100)
                        : d[col];

                if (typeof value === 'string') value = value.replace(/"/g, '""');

                return '"' + value + '"';
            });

            CSVarray.push(row);
        });

        //transform CSV array into CSV string
        var CSV = new Blob([CSVarray.join('\n')], { type: 'text/csv;charset=utf-8;' });
        var fileName = 'CRF-Heat-Map-' + d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date()) + '.csv';
        var link = this.wrap.select('.export#csv');

        if (navigator.msSaveBlob) {
            // IE 10+
            link.style({
                cursor: 'pointer',
                'text-decoration': 'underline',
                color: 'blue'
            });
            navigator.msSaveBlob(CSV, fileName);
        } else {
            // Browsers that support HTML5 download attribute
            if (link.node().download !== undefined) {
                var url = URL.createObjectURL(CSV);
                link.node().setAttribute('href', url);
                link.node().setAttribute('download', fileName);
            }
        }
    }

    function xlsx() {
        var _this = this;

        var context = this;
        var value_cols = this.config.value_cols.map(function(d) {
            return d.col;
        });
        var sheetName = 'CRF Summary';
        var options = {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary'
        };
        var arrayOfArrays = this.export.data.map(function(d) {
            return _this.export.cols.map(function(col) {
                return value_cols.indexOf(col) > -1 &&
                    context.typeDict[col] == 'crfs' &&
                    ['N/A', ''].indexOf(d[col]) < 0
                    ? Math.floor(d[col] * 100) / 100
                    : d[col];
            });
        }); // convert data from array of objects to array of arrays.
        var workbook = {
            SheetNames: [sheetName, 'Current Filters'],
            Sheets: {}
        };

        //Convert headers and data from array of arrays to sheet.
        workbook.Sheets[sheetName] = XLSX.utils.aoa_to_sheet(
            [this.export.headers].concat(arrayOfArrays)
        );
        var sheet = workbook.Sheets[sheetName];

        //Format percentages.
        var cols = this.export.cols.map(function(col, i) {
            return {
                name: col,
                column: String.fromCharCode(i + 65)
            };
        });
        var pctCols = cols.filter(function(col) {
            return value_cols.indexOf(col.name) > -1 && context.typeDict[col.name] == 'crfs';
        });
        var pctCells = Object.keys(sheet).filter(function(key) {
            return (
                pctCols
                    .map(function(col) {
                        return col.column;
                    })
                    .indexOf(key.replace(/\d+/, '')) > -1
            );
        });
        pctCells.forEach(function(pctCell) {
            sheet[pctCell].z = '0%';
        });

        //Add filters to spreadsheet.
        workbook.Sheets[sheetName]['!autofilter'] = {
            ref:
                'A1:' +
                String.fromCharCode(64 + this.export.cols.length) +
                (this.export.data.length + 1)
        };

        //Define column widths in spreadsheet.
        workbook.Sheets[sheetName]['!cols'] = this.export.cols.map(function(col, i) {
            return {
                wpx: value_cols.indexOf(col) > -1 ? 75 : i < _this.config.id_cols.length ? 125 : 100
            };
        });

        //Write current filters to second sheet.
        workbook.Sheets['Current Filters'] = XLSX.utils.aoa_to_sheet(
            [['Filter', 'Value']].concat(
                this.filters.map(function(filter) {
                    return [
                        filter.col,
                        Array.isArray(filter.val) && filter.val.length < filter.choices.length
                            ? filter.val.join(', ')
                            : Array.isArray(filter.val) &&
                              filter.val.length === filter.choices.length
                                ? 'All'
                                : filter.val
                    ];
                })
            )
        );

        var xlsx = XLSX.write(workbook, options),
            s2ab = function s2ab(s) {
                var buffer = new ArrayBuffer(s.length),
                    view = new Uint8Array(buffer);

                for (var i = 0; i !== s.length; ++i) {
                    view[i] = s.charCodeAt(i) & 0xff;
                }
                return buffer;
            }; // convert spreadsheet to binary or something, i don't know

        //transform CSV array into CSV string
        var blob = new Blob([s2ab(xlsx)], { type: 'application/octet-stream;' });
        var fileName = 'CRF-Summary-' + d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date()) + '.xlsx';
        var link = this.wrap.select('.export#xlsx');

        if (navigator.msSaveBlob) {
            // IE 10+
            link.style({
                cursor: 'pointer',
                'text-decoration': 'underline',
                color: 'blue'
            });
            navigator.msSaveBlob(blob, fileName);
        } else {
            // Browsers that support HTML5 download attribute
            if (link.node().download !== undefined) {
                var url = URL.createObjectURL(blob);
                link.node().setAttribute('href', url);
                link.node().setAttribute('download', fileName);
            }
        }
    }

    function dataExport() {
        var _this = this;

        //Export to .csv.
        if (
            this.config.exports.find(function(export_) {
                return export_ === 'csv';
            })
        ) {
            this.wrap.select('.export#csv').on('click', function() {
                deriveData.call(_this);
                csv.call(_this);
            });
        }

        //Export to .xlsx.
        if (
            this.config.exports.find(function(export_) {
                return export_ === 'xlsx';
            })
        ) {
            this.wrap.select('.export#xlsx').on('click', function() {
                deriveData.call(_this);
                xlsx.call(_this);
            });
        }
    }

    function onDraw() {
        var config = this.config;
        var chart = this;

        var t0 = performance.now();
        //begin performance test

        // create strcture to aid in nesting and referncing in addRowDipslayToggle.js
        var id;
        chart.data.summarized.forEach(function(d) {
            id = d['id'].split('  |');
            if (id[2]) {
                d[config.id_cols[2]] = id[2];
                d[config.id_cols[1]] = id[1];
                d[config.id_cols[0]] = id[0];
            } else if (id[1]) {
                d[config.id_cols[1]] = id[1];
                d[config.id_cols[0]] = id[0];
            } else {
                d[config.id_cols[0]] = id[0];
            }
        });

        if (this.data.summarized.length) {
            this.rows = this.tbody.selectAll('tr');
            customizeRows(this, this.rows);
            addStudySummary.call(this);

            this.cells = this.tbody.selectAll('td');
            customizeCells(this, this.cells);
            addInfoBubbles.call(this);
            addRowDisplayToggle.call(this);
            toggleCellAnnotations.call(this);
            dataExport.call(this);
            flagParentRows.call(this);
        }

        //Make sure 'Expand All' check box is not checked
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.option === 'expand_all';
            })
            .select('.changer')
            .property('checked', false);

        //end performance test
        var t1 = performance.now();
        console.log('Call to onDraw took ' + (t1 - t0) + ' milliseconds.');

        this.parent.containers.loading.classed('chm-hidden', true);
    }

    function checkRequiredVariables() {
        var _this = this;

        var requiredVariables = d3
            .set(
                d3.merge([
                    this.settings.synced.nestings.map(function(nesting) {
                        return nesting.value_col + ' (' + nesting.label + ')';
                    }),
                    this.settings.synced.value_cols.map(function(d) {
                        return d.col;
                    }),
                    this.settings.synced.filter_cols
                ])
            )
            .values();
        var missingVariables = requiredVariables.filter(function(variable) {
            return _this.data.variables.indexOf(variable.split(' (')[0]) < 0;
        });
        if (missingVariables.length)
            alert(
                'The data are missing ' +
                    (missingVariables.length === 1 ? 'this variable' : 'these variables') +
                    ': ' +
                    missingVariables.join(', ') +
                    '.'
            );
    }

    function init(data) {
        this.data = {
            raw: data,
            variables: Object.keys(data[0])
        };
        checkRequiredVariables.call(this);
        this.table.init(data);
    }

    //utility functions

    function crfHeatMap(element, settings) {
        //main object
        var crfHeatMap = {
            element: element,
            containers: {},
            settings: {
                user: settings
            },
            init: init
        };

        //settings
        crfHeatMap.settings.defaults = Object.assign(
            {},
            configuration.rendererSettings(),
            configuration.webchartsSettings()
        ); // merge renderer-specific settings with Webcharts settings
        crfHeatMap.settings.merged = merge(crfHeatMap.settings.defaults, crfHeatMap.settings.user); // merge user settings with default settings
        crfHeatMap.settings.synced = configuration.syncSettings(crfHeatMap.settings.merged); // sync properties within merged settings, e.g. data mappings
        crfHeatMap.settings.controls = {
            inputs: configuration.syncControlInputs(crfHeatMap.settings.synced)
        }; // define control settings

        //DOM layout
        defineLayout.call(crfHeatMap);

        //controls
        crfHeatMap.controls = webcharts.createControls(
            crfHeatMap.containers.controls.node(),
            crfHeatMap.settings.controls
        );

        //table
        crfHeatMap.table = webcharts.createTable(
            crfHeatMap.containers.table.node(),
            crfHeatMap.settings.synced,
            crfHeatMap.controls
        );
        crfHeatMap.table.parent = crfHeatMap;
        crfHeatMap.table.initial_config = crfHeatMap.settings.synced;
        crfHeatMap.table.on('init', onInit);
        crfHeatMap.table.on('layout', onLayout);
        crfHeatMap.table.on('draw', onDraw);

        //stylesheet
        defineStyles.call(crfHeatMap);

        return crfHeatMap;
    }

    return crfHeatMap;
});
