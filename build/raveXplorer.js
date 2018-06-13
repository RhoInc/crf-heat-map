(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('webcharts')))
        : typeof define === 'function' && define.amd
            ? define(['webcharts'], factory)
            : (global.raveXplorer = factory(global.webCharts));
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

    function clone(obj) {
        var copy = void 0;

        //boolean, number, string, null, undefined
        if ('object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || null == obj)
            return obj;

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

    var firstColumnWidth = 100;
    var otherColumnWidth = 150;

    var padding = 1;

    function defineStyles() {
        var styles = [
            '.row--hidden {' + '    display: none;' + '}',
            'th,' + 'td {' + ('    padding: ' + padding + 'px !important;') + '}',
            'th:first-child,' +
                'td:first-child {' +
                ('    width: ' + firstColumnWidth + 'px !important;') +
                '}',
            'th:nth-child(n + 2),' +
                'td:nth-child(n + 2) {' +
                ('    width: ' + otherColumnWidth + 'px !important;') +
                '}',

            /* range sliders */

            '#custom-controls th {' + '    border: 1px solid lightgray !important;' + '}',
            '.range-slider-container {' +
                '    position: relative;' +
                '    width: 100%;' +
                '    height: 30px;' +
                '}',
            '.range-slider {' +
                '    width: 100%;' +
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

            /* ID cells */

            '.cell--id {' + '    background: white;' + '}',
            '.row--expandable .cell--id {' +
                '    color: blue;' +
                '    cursor: pointer;' +
                '    text-decoration: underline;' +
                '}',
            '.cell--id--level1 {' + '    padding-left: 0em !important;' + '}',
            '.cell--id--level2 {' + '    padding-left: 1em !important;' + '}',
            '.cell--id--level3 {' + '    padding-left: 2em !important;' + '}',

            /* heat cells */

            '.cell--heat {' + '    text-align: center;' + '    color: transparent;' + '}',
            '.cell--heat--level6:hover,' +
                '.cell--heat--level7:hover,' +
                '.cell--heat--level8:hover,' +
                '.cell--heat--level1:hover,' +
                '.cell--heat--level2:hover,' +
                '.cell--heat--level3:hover {' +
                '    color: black;' +
                '}',
            '.cell--heat--level9:hover,' +
                '.cell--heat--level10:hover,' +
                '.cell--heat--level11:hover,' +
                '.cell--heat--level4:hover,' +
                '.cell--heat--level5:hover {' +
                '    color: white;' +
                '}',
            '.cell--heat {' + '    text-align: center;' + '}',
            '.cell--heat--level6,' +
                '.cell--heat--level7,' +
                '.cell--heat--level8,' +
                '.cell--heat--level1,' +
                '.cell--heat--level2,' +
                '.cell--heat--level3 {' +
                '    color: black;' +
                '}',
            '.cell--heat--level9,' +
                '.cell--heat--level10,' +
                '.cell--heat--level11,' +
                '.cell--heat--level4,' +
                '.cell--heat--level5 {' +
                '    color: white;' +
                '}',
            '.cell--heat--level1 {' + '    background: #edf8e9;' + '}',
            '.cell--heat--level2 {' + '    background: #bae4b3;' + '}',
            '.cell--heat--level3 {' + '    background: #74c476' + '}',
            '.cell--heat--level4 {' + '    background: #31a354;' + '}',
            '.cell--heat--level5 {' + '    background: #006d2c;' + '}',
            '.cell--heat--level6 {' + '    background: #eff3ff;' + '}',
            '.cell--heat--level7 {' + '    background: #bdd7e7;' + '}',
            '.cell--heat--level8 {' + '    background: #6baed6' + '}',
            '.cell--heat--level9 {' + '    background: #3182bd;' + '}',
            '.cell--heat--level10 {' + '    background: #08519c;' + '}',
            '.cell--heat--level11 {' + '    background: #08519c;' + '    color: white;' + '}'
        ];

        //Attach styles to DOM.
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    var rendererSpecificSettings = {
        filterable: true
    };

    var webchartsSettings = {
        id_cols: ['sitename', 'subjectnameoridentifier'],
        value_cols: [
            'is_partial_entry',
            'DATA_PAGE_VERIFIED',
            'is_frozen',
            'is_signed',
            'is_locked',
            'has_open_query',
            'has_answered_query'
        ],
        filter_cols: ['sitename', 'FreezeFlg', 'status', 'subset1', 'subset2', 'subset3'],
        pagination: false,
        searchable: false,
        sortable: false,
        headers: [
            'ID',
            'CRFs Entered',
            'Source Data Verified',
            'Frozen',
            'Signed',
            'Locked',
            'Opened Queries',
            'Answered Queries'
        ],
        cols: null
    };

    var defaultSettings = Object.assign({}, rendererSpecificSettings, webchartsSettings);

    // Replicate settings in multiple places in the settings object
    function syncSettings(settings) {
        settings.cols = d3.merge([['id'], settings.value_cols]);
        return settings;
    }

    // Map values from settings to control inputs
    function syncControlInputs(settings) {
        var defaultControls = [
            {
                type: 'subsetter',
                value_col: 'sitename',
                label: 'Site'
            },
            {
                type: 'subsetter',
                value_col: 'FreezeFlg',
                label: 'Freeze Status'
            },
            {
                type: 'subsetter',
                value_col: 'status',
                label: 'Subject Status'
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
            }
        ];

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

    function processData(data, settings, level) {
        //add array item for each flag
        var longData = [];
        var variables = Object.keys(data[0]).filter(function(key) {
            return settings.value_cols.indexOf(key) < 0;
        });
        data.forEach(function(d) {
            //make key variable for specified levels
            var nestKey =
                '' +
                level +
                settings.id_cols
                    .filter(function(id_col, i) {
                        return i < level;
                    })
                    .map(function(id_col) {
                        return d[id_col];
                    })
                    .join(':');

            settings.value_cols.forEach(function(flag) {
                var newD = {
                    nestKey: nestKey
                };

                for (var i = 0; i < variables.length; i++) {
                    newD[variables[i]] = d[variables[i]];
                }
                newD[flag] = d[flag];
                newD.flag = flag;
                longData.push(newD);
            });
        });

        //Nest data and calculate values for cells
        var ptCols = d3.merge([settings.id_cols, settings.filter_cols]);

        var nested = d3
            .nest()
            .key(function(d) {
                return d.nestKey;
            })
            .key(function(d) {
                return d['flag'];
            })
            .rollup(function(v) {
                // Sums for Query variables
                if (v[0].flag == 'has_open_query' || v[0].flag == 'has_answered_query') {
                    return {
                        raw: v,
                        proportion: d3.sum(v, function(d) {
                            return d[d.flag];
                        })
                    };

                    // Proportions for is_signed using needs_signature as denominator
                } else if (v[0].flag == 'is_signed') {
                    //If there's a denominator of zero we want to catch that - right now I'm saying they're 100% done, may change that
                    if (
                        v.filter(function(d) {
                            return d.needs_signature === '1';
                        }).length === 0
                    ) {
                        return {
                            raw: v,
                            proportion: 'N/A'
                        };
                    } else {
                        return {
                            raw: v,
                            proportion:
                                d3.sum(v, function(d) {
                                    return d[d.flag];
                                }) /
                                v.filter(function(d) {
                                    return d.needs_signature === '1';
                                }).length
                        };
                    }
                    // Proportions for is_verified using needs_verification as denominator
                } else if (v[0].flag == 'DATA_PAGE_VERIFIED') {
                    //If denominator is 0 label cell N/A
                    if (
                        v.filter(function(d) {
                            return d.needs_verification === '1';
                        }).length === 0
                    ) {
                        return {
                            raw: v,
                            proportion: 'N/A'
                        };
                    } else {
                        return {
                            raw: v,
                            proportion:
                                d3.sum(v, function(d) {
                                    return d[d.flag];
                                }) /
                                v.filter(function(d) {
                                    return d.needs_verification === '1';
                                }).length
                        };
                    }
                } else {
                    return {
                        //Proportions for everybody else - using full count for denominator
                        raw: v,
                        proportion:
                            d3.sum(v, function(d) {
                                return d[d.flag];
                            }) / v.length
                    };
                }
            })
            .entries(longData);

        //Flatten the nested data
        var flatData = [];

        nested.forEach(function(d) {
            var ptObj = {};
            ptObj.id = d.key;
            ptObj.level = level;
            var ptCols = d3.merge([settings.id_cols, settings.filter_cols]);
            ptCols.forEach(function(col) {
                ptObj[col] = d.values[0].values.raw[0][col];
            });
            d.values.forEach(function(v) {
                ptObj[v.key] = v.values.proportion;
            });
            flatData.push(ptObj);
        });

        return flatData;
    }

    function flattenData() {
        var t0 = performance.now();
        //begin performance test

        var data;

        if (this.data.filtered_) {
            data = this.data.filtered_;
        } else {
            data = this.data.initial;
        }

        var config = this.config;

        var flatData = [];
        config.id_cols.forEach(function(d, i) {
            flatData = d3.merge([flatData, processData(data, config, i + 1)]);
        });

        var flatData = flatData.sort(function(a, b) {
            return a.id.slice(1) > b.id.slice(1) ? 1 : a.id.slice(1) < b.id.slice(1) ? -1 : 0;
        });

        config.visitOrder = d3
            .set(
                flatData.map(function(d) {
                    return d.flag;
                })
            )
            .values();

        flatData.forEach(function(d) {
            d.flagN = config.visitOrder.indexOf(d.flag) + 1;
        });

        this.data.flattened = flatData;
        this.data.raw = this.data.flattened.slice();

        //end performance test
        var t1 = performance.now();
        console.log('Call to flattenData took ' + (t1 - t0) + ' milliseconds.');
    }

    function onInit() {
        this.data.initial = this.data.raw;
        flattenData.call(this);
    }

    function update(filter) {
        var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

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

    function resetFilters() {
        var _this = this;

        this.columnControls.filters.forEach(function(filter) {
            //Update query maximum.
            if (filter.variable.indexOf('query') > -1)
                filter.max = d3.max(_this.data.filtered, function(di) {
                    return di[filter.variable];
                });

            //Reset upper and lower bounds.
            filter.lower = filter.min;
            filter.upper = filter.max;

            //Reset sliders.
            update.call(_this, filter, true);
        });
    }

    function customizeFilters() {
        var _this = this;

        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(d) {
                return d.type === 'subsetter';
            })
            .on('change', function() {
                _this.data.raw = _this.data.flattened.slice();
                _this.data.filtered = _this.data.raw.slice();
                _this.filters.forEach(function(filter) {
                    _this.data.filtered = _this.data.filtered.filter(function(d) {
                        return filter.val === 'All' || d[filter.col] === filter.val;
                    });
                });
                resetFilters.call(_this);
                _this.draw();
            });
    }

    function createNestControl() {
        var chart = this;
        var config = this.config;

        var idControlWrap = chart.controls.wrap.append('div').attr('class', 'control-group');
        idControlWrap
            .append('div')
            .attr('class', 'wc-control-label')
            .text('Show Status for:');
        var idNote = idControlWrap.append('div').attr('class', 'span-description');
        var idList = ['None', 'sitename', 'subjectnameoridentifier', 'foldername', 'formoid'];
        var idSelects = idControlWrap
            .selectAll('select')
            .data([0, 1, 2])
            .enter()
            .append('select');

        idSelects
            .selectAll('option')
            .data(function(d) {
                return d === 0 // first dropdown shouldn't have "None" option
                    ? idList.filter(function(n) {
                          return n !== 'None';
                      })
                    : idList;
            })
            .enter()
            .append('option')
            .text(function(d) {
                return d;
            })
            .property('selected', function(d) {
                var levelNum = d3.select(this.parentNode).datum();
                return d == config.id_cols[levelNum];
            });

        idSelects.on('change', function() {
            var selectedLevels = [];
            idSelects.each(function(d, i) {
                selectedLevels.push(this.value);
            });

            var uniqueLevels = selectedLevels
                .filter(function(f) {
                    return f != 'None';
                })
                .filter(function(item, pos) {
                    return selectedLevels.indexOf(item) == pos;
                });

            config.id_cols = uniqueLevels;
            flattenData.call(chart);
            resetFilters.call(chart);
            chart.draw();
        });
    }

    function drawLegend() {
        var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g); //check if browser is IE

        var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

        //var colors = ['#FEE724', '#5CC963', '#20918C', '#3A528B', '#440154']; veridis
        var greencolors = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'];

        var legendHeight = 60;
        var legendWidth = 1500;

        var rectHeight = 20;
        var rectWidth = 60;

        // these widths are from what's in defineStyles.js
        // might be way to pull these values from the classes setup there
        // or set them both upstream  -  for now just copy from there
        // had to slide this over slgihtly due to gridlines
        var idCellWidth = firstColumnWidth + padding * 2;
        var heatCellWidth = otherColumnWidth + padding * 2;
        isIE ? (heatCellWidth = heatCellWidth + 1.25) : (heatCellWidth = heatCellWidth + 2.25); // gridlines are little smaller in IE

        var legendSVG = d3
            .selectAll('.wc-chart')
            .insert('svg', 'table')
            .classed('legend', true)
            .attr('width', legendWidth)
            .attr('height', legendHeight);

        // Form Legend
        legendSVG
            .selectAll('.legend')
            .data(colors)
            .enter()
            .append('rect')
            .style({
                fill: function fill(d) {
                    return d;
                },
                'fill-opacity': 1
            })
            .attr('width', rectWidth)
            .attr('height', rectHeight)
            .attr('x', function(d, i) {
                return rectWidth * i + idCellWidth;
            })
            .attr('y', (legendHeight - rectHeight) / 2);

        var formTickLabels = ['0-25%', '25-50%', '50-75%', '75-99%', '100%'];

        legendSVG
            .selectAll('g')
            .data(formTickLabels)
            .enter()
            .append('text')
            .text(function(d) {
                return d;
            })
            .attr('x', function(d, i) {
                return rectWidth * i + idCellWidth;
            })
            .attr('y', (legendHeight - rectHeight) / 2 + rectHeight + 15);

        // Query Legend
        legendSVG
            .selectAll('.legend')
            .data(greencolors)
            .enter()
            .append('rect')
            .style({
                fill: function fill(d) {
                    return d;
                },
                'fill-opacity': 1
            })
            .attr('width', rectWidth)
            .attr('height', rectHeight)
            .attr('x', function(d, i) {
                return rectWidth * i + idCellWidth + heatCellWidth * 5;
            })
            .attr('y', (legendHeight - rectHeight) / 2);

        var queryTickLabels = ['>24', '17-24', '9-16', '1-8', '0'];

        d3.select('svg.legend')
            .selectAll('g')
            .data(queryTickLabels)
            .enter()
            .append('text')
            .text(function(d) {
                return d;
            })
            .attr('x', function(d, i) {
                return rectWidth * i + idCellWidth + heatCellWidth * 5;
            })
            .attr('y', (legendHeight - rectHeight) / 2 + rectHeight + 15);
    }

    function addResetButton(th, d) {
        var _this = this;

        var resetButton = {};
        resetButton.container = d3
            .select(th)
            .append('div')
            .classed('reset-button-container', true);
        resetButton.button = resetButton.container
            .append('button')
            .classed('reset-button', true)
            .text('Reset sliders')
            .on('click', function() {
                resetFilters.call(_this);
                _this.data.raw = _this.data.flattened;
                _this.draw();
            });
        this.columnControls.resetButton = resetButton;
    }

    function layout(filter) {
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

    function filterData() {
        var _this = this;

        this.data.raw = this.data.flattened;
        this.columnControls.filters.forEach(function(filter) {
            _this.data.raw = _this.data.raw.filter(function(d) {
                return (
                    (filter.lower <= d[filter.variable] && d[filter.variable] <= filter.upper) ||
                    (filter.lower === 0 && d[filter.variable] === 'N/A')
                );
            });
        });
    }

    function onInput(filter) {
        var context = this;

        //Attach an event listener to sliders.
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
            filterData.call(context);
            context.draw();
        });
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
        createNestControl.call(this);
        drawLegend.call(this);
        addColumnControls.call(this);
    }

    function customizeRows() {
        var _this = this;

        this.rows = this.tbody.selectAll('tr');
        this.rows
            .classed('row', true)
            .classed('row--expandable row--collapsed', function(d) {
                return d.level < _this.config.id_cols.length;
            })
            .classed('row--hidden', function(d) {
                return d.level > 1;
            });
    }

    function customizeCells() {
        this.cells = this.tbody.selectAll('td');
        this.cells
            .attr('class', function(d) {
                var cellClass = 'cell';

                if (d.col === 'id')
                    cellClass =
                        cellClass + ' cell--id' + ' cell--id--level' + d.text.substring(0, 1);
                else {
                    cellClass = cellClass + ' cell--heat';
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
                    cellClass = cellClass + ' cell--heat--level' + level;
                }

                return cellClass;
            })
            .text(function(d) {
                return d.col === 'id'
                    ? d.text.indexOf(':') > -1
                        ? d.text.substring(d.text.lastIndexOf(':') + 1)
                        : d.text.substring(1)
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

        var expandable_rows = this.rows
            .filter(function(d) {
                return d.level < config.id_cols.length;
            })
            .select('td');

        //get children for each row
        expandable_rows.each(function(d) {
            var child_id =
                d.level +
                1 +
                config.id_cols
                    .filter(function(id_col, i) {
                        return i <= d.level - 1;
                    })
                    .map(function(matchVar) {
                        return d[matchVar];
                    })
                    .join(':') +
                ':';
            d.children = chart.rows.filter(function(d) {
                return d.id.indexOf(child_id) > -1;
            });
        });

        expandable_rows.on('click', function(d) {
            var row = d3.select(this.parentNode);
            var collapsed = !row.classed('row--collapsed');

            row.classed('row--collapsed', collapsed) //toggle the class
                .classed('row--expanded', !collapsed); //toggle the class

            function iterativeCollapse(d) {
                if (d.children) {
                    d.children
                        .classed('row--hidden row--collapsed', true)
                        .classed('row--expanded', false);
                    d.children.each(function(di) {
                        iterativeCollapse(di);
                    });
                }
            }

            if (collapsed) {
                iterativeCollapse(d); //hide the whole tree
            } else {
                d.children.classed('row--hidden', false); //show just the immediate children
            }
        });
    }

    function onDraw() {
        var t0 = performance.now();
        //begin performance test

        customizeRows.call(this);
        customizeCells.call(this);
        addRowDisplayToggle.call(this);

        //end performance test
        var t1 = performance.now();
        console.log('Call to onDraw took ' + (t1 - t0) + ' milliseconds.');
    }

    //utility functions
    //styles, configuration, and webcharts
    //table callbacks
    function raveXplorer(element, settings) {
        var mergedSettings = merge(defaultSettings, settings),
            //Merge user settings onto default settings.
            syncedSettings = syncSettings(mergedSettings),
            //Sync properties within merged settings, e.g. data mappings.
            syncedControlInputs = syncControlInputs(syncedSettings),
            //Sync merged settings with controls.
            controls = webcharts.createControls(element, {
                location: 'top',
                inputs: syncedControlInputs
            }),
            //Define controls.
            chart = webcharts.createTable(element, mergedSettings, controls); //Define chart.

        chart.config = clone(mergedSettings);
        chart.on('init', onInit);
        chart.on('layout', onLayout);
        chart.on('draw', onDraw);

        defineStyles();

        return chart;
    }

    return raveXplorer;
});
