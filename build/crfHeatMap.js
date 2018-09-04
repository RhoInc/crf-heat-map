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
                // .length of function is 2
                'use strict';

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

    var asyncGenerator = (function() {
        function AwaitValue(value) {
            this.value = value;
        }

        function AsyncGenerator(gen) {
            var front, back;

            function send(key, arg) {
                return new Promise(function(resolve, reject) {
                    var request = {
                        key: key,
                        arg: arg,
                        resolve: resolve,
                        reject: reject,
                        next: null
                    };

                    if (back) {
                        back = back.next = request;
                    } else {
                        front = back = request;
                        resume(key, arg);
                    }
                });
            }

            function resume(key, arg) {
                try {
                    var result = gen[key](arg);
                    var value = result.value;

                    if (value instanceof AwaitValue) {
                        Promise.resolve(value.value).then(
                            function(arg) {
                                resume('next', arg);
                            },
                            function(arg) {
                                resume('throw', arg);
                            }
                        );
                    } else {
                        settle(result.done ? 'return' : 'normal', result.value);
                    }
                } catch (err) {
                    settle('throw', err);
                }
            }

            function settle(type, value) {
                switch (type) {
                    case 'return':
                        front.resolve({
                            value: value,
                            done: true
                        });
                        break;

                    case 'throw':
                        front.reject(value);
                        break;

                    default:
                        front.resolve({
                            value: value,
                            done: false
                        });
                        break;
                }

                front = front.next;

                if (front) {
                    resume(front.key, front.arg);
                } else {
                    back = null;
                }
            }

            this._invoke = send;

            if (typeof gen.return !== 'function') {
                this.return = undefined;
            }
        }

        if (typeof Symbol === 'function' && Symbol.asyncIterator) {
            AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
                return this;
            };
        }

        AsyncGenerator.prototype.next = function(arg) {
            return this._invoke('next', arg);
        };

        AsyncGenerator.prototype.throw = function(arg) {
            return this._invoke('throw', arg);
        };

        AsyncGenerator.prototype.return = function(arg) {
            return this._invoke('return', arg);
        };

        return {
            wrap: function(fn) {
                return function() {
                    return new AsyncGenerator(fn.apply(this, arguments));
                };
            },
            await: function(value) {
                return new AwaitValue(value);
            }
        };
    })();

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

        //Nest data by the ID variable defined above and calculate statistics for each summary variable.
        var nest = d3
            .nest()
            .key(function(d) {
                return d.id;
            })
            .rollup(function(d) {
                //Define denominators.
                var summary = {
                    nForms: d.length,
                    nNeedsVerification: d.filter(function(di) {
                        return di.needs_verification === '1';
                    }).length,
                    nNeedsSignature: d.filter(function(di) {
                        return di.needs_signature === '1';
                    }).length
                };

                //Define summarized values, either rates or counts.
                _this.config.value_cols.forEach(function(value_col) {
                    var count = d3.sum(d, function(di) {
                        return di[value_col];
                    });
                    summary[value_col] =
                        ['is_partial_entry', 'ready_for_freeze', 'is_frozen', 'is_locked'].indexOf(
                            value_col
                        ) > -1
                            ? summary.nForms
                                ? count / summary.nForms
                                : 'N/A'
                            : ['verified'].indexOf(value_col) > -1
                                ? summary.nNeedsVerification
                                    ? count / summary.nNeedsVerification
                                    : 'N/A'
                                : ['is_signed'].indexOf(value_col) > -1
                                    ? summary.nNeedsSignature
                                        ? count / summary.nNeedsSignature
                                        : 'N/A'
                                    : ['open_query_ct', 'answer_query_ct'].indexOf(value_col) > -1
                                        ? count
                                        : console.log('Missed one: ' + value_col);
                });
                summary.nest_level = d[0].nest_level;
                summary.parents = d[0].parents;
                return summary;
            })
            .entries(this.data.initial_filtered);

        //Convert the nested data array to a flat data array.
        nest.forEach(function(d) {
            d.id = d.key;
            delete d.key;
            _this.config.value_cols.forEach(function(value_col) {
                d[value_col] = d.values[value_col];
            });
            d.nest_level = d.values.nest_level;
            d.parents = d.values.parents;

            delete d.values;
        });

        //Add summarized data to array of summaries.
        this.data.summaries.push(nest);
    }

    function summarizeData() {
        var _this = this;

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
            });

            calculateStatistics.call(_this);
        });

        //Collapse array of arrays to array of objects.
        this.data.summarized = d3.merge(this.data.summaries).sort(function(a, b) {
            return a.id < b.id ? -1 : 1;
        });
        this.data.raw = this.data.summarized;

        //end performance test
        var t1 = performance.now();
        console.log('Call to summarizeData took ' + (t1 - t0) + ' milliseconds.');
    }

    function update(filter) {
        var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
        if (isIE) {
            //update lower slider and annotation
            if (reset)
                filter.lowerSlider
                    .attr({
                        min: filter.min,
                        max: function max(d) {
                            if (d.variable.indexOf('query') < 0) {
                                return filter.max * 100;
                            } else {
                                return filter.upper;
                            }
                        }
                    })
                    .property('value', filter.lower);

            //update upper slider and annotation
            if (reset)
                filter.upperSlider
                    .attr({
                        min: filter.min,
                        max: function max(d) {
                            if (d.variable.indexOf('query') < 0) {
                                return filter.max * 100;
                            } else {
                                return filter.upper;
                            }
                        }
                    })
                    .property('value', function(d) {
                        return d.variable.indexOf('query') < 0 ? filter.upper * 100 : filter.upper;
                    });
        } else {
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
                    (filter.variable.indexOf('query') < 0
                        ? Math.round(filter.lower * 100)
                        : filter.lower) +
                    (filter.variable.indexOf('query') < 0 ? '%' : '')
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
                    (filter.variable.indexOf('query') < 0
                        ? Math.round(filter.upper * 100)
                        : filter.upper) +
                    (filter.variable.indexOf('query') < 0 ? '%' : '')
            );
        }
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
            update.call(_this, filter, true);
        });
    }

    function redraw() {
        summarizeData.call(this);
        resetFilters.call(this);
        this.draw(this.data.summarized);
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
            '#chm-crf-legend {' + '    float: left;' + '    width: 74.9%;' + '}',
            '#chm-query-legend {' + '    float: right;' + '    width: 24.9%;' + '}',
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
            '.range-annotation--upper {' + '    text-align: right;' + '}',
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
                '    background: #999;' +
                '    font-size: 0;' +
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
            nestings: [
                {
                    value_col: 'sitename',
                    label: 'Site',
                    default_nesting: true
                },
                {
                    value_col: 'subjectnameoridentifier',
                    label: 'Subject ID',
                    default_nesting: true
                },
                {
                    value_col: 'folderinstancename',
                    label: 'Folder',
                    default_nesting: false
                },
                {
                    value_col: 'ecrfpagename',
                    label: 'Form',
                    default_nesting: false
                }
            ],
            value_cols: [
                'is_partial_entry',
                'verified',
                'ready_for_freeze',
                'is_frozen',
                'is_signed',
                'is_locked',
                'open_query_ct',
                'answer_query_ct'
            ],
            filter_cols: ['sitename', 'subjfreezeflg', 'status', 'subset1', 'subset2', 'subset3'],
            display_cell_annotations: true,
            expand_all: false
        };
    }

    function webchartsSettings() {
        return {
            cols: null,
            headers: [
                'ID',
                'Entered',
                'Source Data Verified',
                'Ready for Freeze',
                'Frozen',
                'Signed',
                'Locked',
                'Open',
                'Answered'
            ],
            applyCSS: true,
            searchable: false,
            sortable: false,
            pagination: false,
            exportable: true,
            exports: ['csv']
        };
    }

    function syncSettings(settings) {
        settings.id_cols = settings.nestings
            .filter(function(d) {
                return d.default_nesting === true;
            })
            .map(function(f) {
                return f.value_col;
            })
            .slice(0, 3);
        settings.cols = d3.merge([['id'], settings.value_cols]);

        return settings;
    }

    function controlInputs() {
        return [
            {
                type: 'subsetter',
                value_col: 'sitename',
                label: 'Site'
            },
            {
                type: 'subsetter',
                value_col: 'subjfreezeflg',
                label: 'Subject Freeze Status'
            },
            {
                type: 'subsetter',
                value_col: 'status',
                label: 'Subject Status',
                multiple: true
            },
            {
                type: 'subsetter',
                value_col: 'subset1',
                label: 'Subsets: 1'
            },
            {
                type: 'subsetter',
                value_col: 'subset2',
                label: '2'
            },
            {
                type: 'subsetter',
                value_col: 'subset3',
                label: '3'
            },
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
                return d.type === 'checkbox';
            })
            .select('.changer')
            .on('change', function(d) {
                var changer_this = this;

                var loadingdiv = d3.select('#chm-loading');

                loadingdiv.classed('chm-hidden', false);

                var loading = setInterval(function() {
                    var loadingIndicated = loadingdiv.style('display') !== 'none';

                    if (loadingIndicated) {
                        clearInterval(loading);
                        loadingdiv.classed('chm-hidden', true);

                        context.config[d.option] = changer_this.checked;
                        context.draw(context.data.raw);
                    }
                }, 25);
            });
    }

    function addResetButton(th, d) {
        var _this = this;

        var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
        var resetButton = {};
        resetButton.container = d3
            .select(th)
            .append('div')
            .classed('reset-button-container', true);

        if (isIE) {
            resetButton.button = resetButton.container
                .append('button')
                .classed('reset-button', true)
                .text('Reset Ranges') // changed the name for IE
                .on('click', function() {
                    _this.data.raw = _this.data.summarized;
                    resetFilters.call(_this);
                    _this.draw(_this.data.raw);
                });
        } else {
            resetButton.button = resetButton.container
                .append('button')
                .classed('reset-button', true)
                .text('Reset sliders')
                .on('click', function() {
                    _this.data.raw = _this.data.summarized;
                    resetFilters.call(_this);
                    _this.draw(_this.data.raw);
                });
        }
        this.columnControls.resetButton = resetButton;
    }

    function layout(filter) {
        var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
        if (isIE) {
            //add containing div to header cell
            filter.div = filter.cell
                .append('div')
                .datum(filter)
                .classed('range-slider-container', true);

            //lower slider
            var rangeValueLowerDiv = filter.div
                .append('div')
                .classed('range-value-container range-value-container--lower', true);
            filter.lowerSlider = rangeValueLowerDiv
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
                    return d.variable.indexOf('query') < 0 ? '%' : '';
                });

            filter.div
                .append('span')
                .classed('chm-dash', true)
                .text(function(d) {
                    return ' - ';
                });

            //upper slider
            var rangeValueUpperDiv = filter.div
                .append('div')
                .classed('range-value-container range-value-container--upper', true);
            filter.upperSlider = rangeValueUpperDiv
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
                    return d.variable.indexOf('query') < 0 ? '%' : '';
                });
        } else {
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
                    step: filter.variable.indexOf('query') < 0 ? 0.01 : 1,
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
                    step: filter.variable.indexOf('query') < 0 ? 0.01 : 1,
                    min: 0
                });
            filter.upperAnnotation = filter.div
                .append('span')
                .classed('range-annotation range-annotation--upper', true);
        }
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
                var filtered_low = +d[filter.variable] < +filter.lower;
                var filtered_high = +d[filter.variable] > +filter.upper;
                //filtered_missing = d[filter.variable] === 'N/A'
                if (filtered_low || filtered_high) {
                    d.filtered = true;
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
        this.data.summarized = this.data.summarized.map(function(m) {
            m.visible_child = unique_visible_row_parents.indexOf(m.id) > -1;
            return m;
        });

        //and set filtered_parent = true if filted = true

        this.data.raw = this.data.summarized.filter(function(f) {
            return !f.filtered || f.visible_child;
        });
        console.log(this.data.raw);
    }

    function onInput(filter) {
        var context = this;

        var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

        if (isIE) {
            //Attach an event listener to sliders.
            filter.sliders = filter.div.selectAll('.range-value').on('change', function(d) {
                var _this = this;

                var loadingdiv = d3.select('#chm-loading');

                loadingdiv.classed('chm-hidden', false);

                var loading = setInterval(function() {
                    var loadingIndicated = loadingdiv.style('display') !== 'none';

                    if (loadingIndicated) {
                        clearInterval(loading);
                        loadingdiv.classed('chm-hidden', true);

                        var sliders = _this.parentNode.parentNode.getElementsByTagName('input');
                        var slider1 = parseFloat(sliders[0].value);
                        var slider2 = parseFloat(sliders[1].value);

                        if (slider1 <= slider2) {
                            if (d.variable.indexOf('query') < 0) {
                                d.lower = slider1 / 100;
                                d.upper = slider2 / 100;
                            } else {
                                d.lower = slider1;
                                d.upper = slider2;
                            }
                        } else {
                            if (d.variable.indexOf('query') < 0) {
                                d.lower = slider2 / 100;
                                d.upper = slider1 / 100;
                            } else {
                                d.lower = slider2;
                                d.upper = slider1;
                            }
                        }
                        update.call(context, d);
                        filterData.call(context);
                        context.draw(context.data.raw);
                    }
                }, 25);
            });

            filter.sliders = filter.div.selectAll('.range-value').on('input', function(d) {
                var sliders = this.parentNode.parentNode.getElementsByTagName('input');
                var slider1 = parseFloat(sliders[0].value);
                var slider2 = parseFloat(sliders[1].value);

                if (slider1 <= slider2) {
                    if (d.variable.indexOf('query') < 0) {
                        d.lower = slider1 / 100;
                        d.upper = slider2 / 100;
                    } else {
                        d.lower = slider1;
                        d.upper = slider2;
                    }
                } else {
                    if (d.variable.indexOf('query') < 0) {
                        d.lower = slider2 / 100;
                        d.upper = slider1 / 100;
                    } else {
                        d.lower = slider2;
                        d.upper = slider1;
                    }
                }
                update.call(context, d);
            });
        } else {
            filter.sliders = filter.div.selectAll('.range-slider').on('change', function(d) {
                var _this2 = this;

                var loadingdiv = d3.select('#chm-loading');

                loadingdiv.classed('chm-hidden', false);

                var loading = setInterval(function() {
                    var loadingIndicated = loadingdiv.style('display') !== 'none';

                    if (loadingIndicated) {
                        clearInterval(loading);
                        loadingdiv.classed('chm-hidden', true);

                        var sliders = _this2.parentNode.getElementsByTagName('input');
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
        }
    }

    function addSliders(th, d) {
        //Define layout of header cells.
        var filter = this.columnControls.filters.find(function(filter) {
            return filter.variable === d;
        });
        filter.cell = d3.select(th);

        //Lay out, initialize, and define event listeners for column filter.
        layout.call(this, filter);
        update.call(this, filter, true);
        onInput.call(this, filter);
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
                            variable.indexOf('query') < 0
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

    function customizeRows() {
        var _this = this;

        this.rows = this.tbody.selectAll('tr');
        this.rows
            .classed('chm-table-row', true)
            .classed('chm-table-row--expandable', function(d) {
                return d.id.split('  |').length < _this.config.id_cols.length;
            })
            .classed('chm-table-row--collapsed', function(d) {
                return d.id.split('  |').length < _this.config.id_cols.length;
            })
            .classed('chm-hidden', function(d) {
                return d.id.indexOf('  |') > -1;
            });
    }

    function customizeCells() {
        // add Dynel's hover text to table headers
        d3
            .select('th.answer_query_ct')
            .attr('title', 'Site has closed issue, but DM needs to close or requery.');
        d3
            .select('th.is_frozen')
            .attr('title', 'Data is clean and there are no outstanding issues.');

        this.cells = this.tbody.selectAll('td');
        this.cells
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
                    if (d.col.indexOf('query') > -1)
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
                    : d.col.indexOf('query') < 0
                        ? d.text === 'N/A'
                            ? d.text
                            : d3.format('%')(d.text)
                        : d.text;
            });
    }

    function addRowDisplayToggle() {
        var chart = this;
        var config = this.config;

        if (this.config.expand_all) {
            this.rows.classed('chm-hidden', false);
        }

        var max_id_level = chart.config.id_cols.length - 2;

        function iterateNest(d, id_level) {
            return d3
                .nest()
                .key(function(d) {
                    return d[config.id_cols[id_level]];
                })
                .rollup(function(rows) {
                    if (id_level + 1 <= max_id_level) {
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

        var childNest = iterateNest(chart.data.raw, 0);

        var expandable_rows = this.rows
            .data(chart.data.raw)
            .filter(function(d) {
                return d.nest_level < config.id_cols.length;
            })
            .select('td');

        expandable_rows.on('click', function(d) {
            var row = d3.select(this.parentNode);
            var collapsed = !row.classed('chm-table-row--collapsed');

            row
                .classed('chm-table-row--collapsed', collapsed) //toggle the class
                .classed('chm-table-row--expanded', !collapsed); //toggle the class

            var currentNest = childNest;
            d.id.split('  |').forEach(function(level) {
                currentNest = currentNest[level];
            });
            var childIds;
            // when collapsing, if the nest's children have children, loop throough and build array with those included
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
            var rowChildren = chart.rows.filter(function(f) {
                return childIds.indexOf(f.id) > -1;
            });
            if (collapsed) {
                rowChildren
                    .classed('chm-hidden chm-table-row--collapsed', true)
                    .classed('chm-table-row--expanded', false);
            } else {
                rowChildren.classed('chm-hidden', false); //show just the immediate children
            }
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

        var subject_id_col_index = this.config.id_cols.indexOf('subjectnameoridentifier');
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
                        return d['subjectnameoridentifier'];
                    })
                )
                .values();
            var subjectMap = subjects.reduce(function(acc, cur) {
                var subjectDatum = _this.data.initial.find(function(d) {
                    return d['subjectnameoridentifier'] === cur;
                });
                acc[cur] = {
                    site: subjectDatum.sitename,
                    status: subjectDatum.status,
                    freeze: subjectDatum.subjfreezeflg
                };
                return acc;
            }, {});
        }

        //Define data.
        this.export.data = this.data.filtered.slice();
        this.export.data.forEach(function(d, i, thisArray) {
            //Split ID variable into as many columns as nests currently in place.
            _this.export.nests.forEach(function(id_col, j) {
                var id_val = d.id.split('  |')[j];
                d[id_col] = id_val || 'Total';
            });

            // Now "join" subject level information to export data
            if (subject_id_col) {
                var subjectID =
                    d['Nest ' + (subject_id_col_index + 1) + ': subjectnameoridentifier'];
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
                    _this.config.value_cols.indexOf(col) > -1 &&
                    col.indexOf('query') < 0 &&
                    ['N/A', ''].indexOf(d[col]) < 0
                        ? Math.round(d[col] * 100)
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

        var sheetName = 'CRF Summary';
        var options = {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary'
        };
        var arrayOfArrays = this.export.data.map(function(d) {
            return _this.export.cols.map(function(col) {
                return _this.config.value_cols.indexOf(col) > -1 &&
                    col.indexOf('query') < 0 &&
                    ['N/A', ''].indexOf(d[col]) < 0
                    ? d[col]
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
            return _this.config.value_cols.indexOf(col.name) > -1 && col.name.indexOf('query') < 0;
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
                wpx:
                    _this.config.value_cols.indexOf(col) > -1
                        ? 75
                        : i < _this.config.id_cols.length
                            ? 125
                            : 100
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

    function flagParentRows() {
        this.rows.classed('grayParent', function(d) {
            return d.filtered & d.visible_child;
        });
    }

    function onDraw() {
        var config = this.config;
        var chart = this;
        console.log(this.data.raw);

        var t0 = performance.now();
        //begin performance test

        // create strcture to aid in nesting and referncing in addRowDipslayToggle.js
        var id;
        chart.data.raw.forEach(function(d) {
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
            customizeRows.call(this);
            customizeCells.call(this);
            addRowDisplayToggle.call(this);
            toggleCellAnnotations.call(this);
            dataExport.call(this);
            flagParentRows.call(this);
        }

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
                    this.settings.synced.value_cols,
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
    //styles, configuration, and webcharts
    //table callbacks
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
