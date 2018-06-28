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

    var firstColumnWidth = 200;
    var otherColumnWidth = 150;

    var paddingRight = 6;
    var paddingLeft = 6;

    function defineStyles() {
        var styles = [
            '.row--hidden {' + '    display: none;' + '}',
            '.wc-table table thead tr th,' +
                '.wc-table table tbody tr td {' +
                ('    padding-right: ' + paddingRight + 'px;') +
                ('    padding-left: ' + paddingLeft + 'px;') +
                '}',
            '.wc-table table thead tr th:first-child,' +
                '.wc-table table tbody tr td:first-child {' +
                ('    width: ' + firstColumnWidth + 'px !important;') +
                '    text-align: left;' +
                '}',
            '.wc-table table thead tr:not(#column-controls) th:nth-child(n + 2),' +
                '.wc-table table tbody tr td:nth-child(n + 2) {' +
                ('    width: ' + otherColumnWidth + 'px !important;') +
                '    text-align: left;' +
                '}',
            '.wc-table table tbody tr:hover td {' + '    border-bottom: 1px solid black;' + '}',
            '.wc-table table tbody tr:hover td:first-child {' +
                '    border-left: 1px solid black;' +
                '}',

            /* range sliders */

            '#column-controls th {' + '}',
            '.reset-button {' + '    width: 100%;' + '}',
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
            '.filter-value--lower {' +
                '    width: 40px' +
                //        'margin: 5 px' +
                // '    align: left' +
                // '.text {' +
                //   '    width: 10px' +
                //        'margin: 5 px' +
                // '    align: left' +
                '}',
            '.filter-value--upper {' +
                '    width: 40px' +
                //        'margin: 5 px' +
                // '    align: right' +
                '}',
            /* ID cells */

            '.cell--id {' + '    background: white;' + '}',
            '.row--expandable .cell--id {' +
                '    color: blue;' +
                '    cursor: pointer;' +
                '    text-decoration: underline;' +
                '}',
            '.cell--id--level2 {' + '    text-indent: 1em;' + '}',
            '.cell--id--level3 {' + '    text-indent: 2em;' + '}',

            /* heat cells */

            '.cell--heat {' + '    text-align: right;' + '    font-size: 12px;' + '}',
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

    function rendererSettings() {
        return {
            nestings: [
                {
                    value_col: 'sitename',
                    label: 'Site',
                    default: true
                },
                {
                    value_col: 'subjectnameoridentifier',
                    label: 'Subject ID',
                    default: true
                },
                {
                    value_col: 'foldername',
                    label: 'Folder',
                    default: false
                },
                {
                    value_col: 'formoid',
                    label: 'Form',
                    default: false
                }
            ],
            value_cols: [
                'is_partial_entry',
                'DATA_PAGE_VERIFIED',
                'is_frozen',
                'is_signed',
                'is_locked',
                'open_query_cnt',
                'answer_query_cnt'
            ],
            filter_cols: ['sitename', 'FreezeFlg', 'status', 'subset1', 'subset2', 'subset3'],
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
                return d.default === true;
            })
            .map(function(f) {
                return f.value_col;
            });
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
                        ['is_partial_entry', 'is_frozen', 'is_locked'].indexOf(value_col) > -1
                            ? summary.nForms
                                ? count / summary.nForms
                                : 'N/A'
                            : ['DATA_PAGE_VERIFIED'].indexOf(value_col) > -1
                                ? summary.nNeedsVerification
                                    ? count / summary.nNeedsVerification
                                    : 'N/A'
                                : ['is_signed'].indexOf(value_col) > -1
                                    ? summary.nNeedsSignature
                                        ? count / summary.nNeedsSignature
                                        : 'N/A'
                                    : ['open_query_cnt', 'answer_query_cnt'].indexOf(value_col) > -1
                                        ? count
                                        : console.log('Missed one: ' + value_col);
                });

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
                d.id = _this.config.id_cols
                    .slice(0, i + 1)
                    .map(function(id_col1) {
                        return d[id_col1];
                    })
                    .join('|');
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

    function onInit() {
        this.data.initial = this.data.raw;
        this.data.initial_filtered = this.data.initial;

        //Summarize raw data.
        summarizeData.call(this);

        //Manually set controls' data to raw data.
        this.controls.data = this.data.initial;
        this.controls.ready = true;
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

        //collapse rows and uncheck 'Expand All' Box
        this.config.expand_all = false;
        this.controls.wrap
            .selectAll('.control-group')
            .filter(function(f) {
                return f.option === 'expand_all';
            })
            .select('input')
            .property('checked', false);

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
                    context.filters.find(function(filter) {
                        return filter.col === di.value_col;
                    }).val = dropdown.select('option:checked').text();
                    context.data.initial_filtered = context.data.initial;
                    context.filters
                        .filter(function(filter) {
                            return filter.val !== 'All';
                        })
                        .forEach(function(filter) {
                            if (filter.val !== 'All')
                                context.data.initial_filtered = context.data.initial_filtered.filter(
                                    function(dii) {
                                        return dii[filter.col] === filter.val;
                                    }
                                );
                        });

                    //Summarize filtered data and redraw table.
                    redraw.call(context);
                });
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
                context.config[d.option] = this.checked;
                context.draw(context.data.raw);
            });
    }

    function createNestControl() {
        var context = this;
        var config = this.config;

        var idList = context.initial_config.nestings;
        idList.push({ value_col: undefined, label: 'None' });

        var idControlWrap = context.controls.wrap.append('div').attr('class', 'control-group');
        idControlWrap
            .append('div')
            .attr('class', 'wc-control-label')
            .text('Show Status for:');
        var idNote = idControlWrap.append('div').attr('class', 'span-description');
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
            var selectedLevels = [];
            idSelects.each(function(d, i) {
                var _this = this;

                selectedLevels.push(
                    idList.filter(function(n) {
                        return n.label === _this.value;
                    })[0].value_col
                );
            });

            var uniqueLevels = selectedLevels
                .filter(function(f) {
                    return f != undefined;
                })
                .filter(function(item, pos) {
                    return selectedLevels.indexOf(item) == pos;
                });

            config.id_cols = uniqueLevels;

            //Summarize filtered data and redraw table.
            redraw.call(context);
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
        var idCellWidth = firstColumnWidth + paddingRight + paddingLeft;
        var heatCellWidth = otherColumnWidth + paddingRight + paddingLeft;
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

        // Add Title
        d3
            .select('svg.legend')
            .append('text')
            .text('CRFs')
            .style({
                'font-weight': 'bold',
                'font-size': '17px'
            })
            .attr('x', idCellWidth)
            .attr('y', legendHeight - rectHeight - 25);

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

        d3
            .select('svg.legend')
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

        // Add Title
        d3
            .select('svg.legend')
            .append('text')
            .text('Queries')
            .style({
                'font-weight': 'bold',
                'font-size': '17px'
            })
            .attr('x', idCellWidth + heatCellWidth * 5)
            .attr('y', legendHeight - rectHeight - 25);
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
            filter.lowerSlider = filter.div
                .append('input')
                .classed('range-value filter-value--lower', true)
                .attr({
                    type: 'number',
                    min: 0,
                    step: 1,
                    value: 0
                });

            filter.div
                .append('text')
                .classed('text', true)
                .text(function(d) {
                    return d.variable.indexOf('query') < 0 ? '% - ' : ' - ';
                });

            //upper slider
            filter.upperSlider = filter.div
                .append('input')
                .classed('range-value filter-value--upper', true)
                .attr({
                    type: 'number',
                    min: 0,
                    step: 1,
                    value: 100
                });

            filter.div
                .append('text')
                .classed('text', true)
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

        this.data.raw = this.data.summarized;
        this.columnControls.filters.forEach(function(filter) {
            _this.data.raw = _this.data.raw.filter(function(d) {
                return (
                    (filter.lower <= d[filter.variable] && d[filter.variable] <= filter.upper) ||
                    (filter.upper === 1 && d[filter.variable] === 'N/A')
                );
            });
        });
    }

    function onInput(filter) {
        var context = this;

        var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

        if (isIE) {
            //Attach an event listener to sliders.
            filter.sliders = filter.div.selectAll('.range-value').on('input', function(d) {
                //expand rows and check 'Expand All'

                context.config.expand_all = true;
                context.controls.wrap
                    .selectAll('.control-group')
                    .filter(function(f) {
                        return f.option === 'expand_all';
                    })
                    .select('input')
                    .property('checked', true);

                var sliders = this.parentNode.getElementsByTagName('input');
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
            });
        } else {
            filter.sliders = filter.div.selectAll('.range-slider').on('input', function(d) {
                //expand rows and check 'Expand All'
                context.config.expand_all = true;
                context.controls.wrap
                    .selectAll('.control-group')
                    .filter(function(f) {
                        return f.option === 'expand_all';
                    })
                    .select('input')
                    .property('checked', true);
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
                context.draw(context.data.raw);
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
        customizeCheckboxes.call(this);
        createNestControl.call(this);
        drawLegend.call(this);
        addColumnControls.call(this);
    }

    function customizeRows() {
        var _this = this;

        this.rows = this.tbody.selectAll('tr');
        this.rows
            .classed('row', true)
            .classed('row--expandable', function(d) {
                return d.id.split('|').length < _this.config.id_cols.length;
            })
            .classed('row--collapsed', function(d) {
                return d.id.split('|').length < _this.config.id_cols.length;
            })
            .classed('row--hidden', function(d) {
                return d.id.indexOf('|') > -1;
            });
    }

    function customizeCells() {
        this.cells = this.tbody.selectAll('td');
        this.cells
            .attr('class', function(d) {
                var cellClass = 'cell';

                if (d.col === 'id')
                    cellClass =
                        cellClass + ' cell--id' + ' cell--id--level' + d.text.split('|').length;
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
                    ? d.text.split('|')[d.text.split('|').length - 1]
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
            this.rows.classed('row--hidden', false);
        }

        var expandable_rows = this.rows
            .filter(function(d) {
                return d.id.split('|').length < config.id_cols.length;
            })
            .select('td');

        //get children for each row
        expandable_rows.each(function(d) {
            d.children = chart.rows.filter(function(di) {
                return (
                    di.id.indexOf(d.id + '|') > -1 &&
                    d.id.split('|').length === di.id.split('|').length - 1
                );
            });
        });

        expandable_rows.on('click', function(d) {
            var row = d3.select(this.parentNode);
            var collapsed = !row.classed('row--collapsed');

            row
                .classed('row--collapsed', collapsed) //toggle the class
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

        //Define data.
        this.export.data = this.data.filtered.slice();
        this.export.data.forEach(function(d, i) {
            //Split ID variable into as many columns as nests currently in place.
            _this.export.nests.forEach(function(id_col, j) {
                var id_val = d.id.split('|')[j];
                d[id_col] = id_val || 'Total';
            });
        });

        //conditionally add subject level data if subjectID is the lowest id level
        if (table.config.id_cols[table.config.id_cols.length - 1] === 'subjectnameoridentifier') {
            //Add headers.
            this.export.headers.push('Site', 'Subject Status', 'Freeze Status');

            //Add columns.
            this.export.cols.push('site', 'status', 'freeze');

            // build look up for subject
            var subjectmap = {};
            table.data.initial.forEach(function(row) {
                subjectmap[row.subjectnameoridentifier] = {
                    site: row['sitename'],
                    status: row['status'],
                    freeze: row['SubjFreezeFlg']
                };
            });

            // Now "join" subject level information to export data

            // case 1: Subject is only nest
            if (table.config.id_cols.length == 1) {
                this.export.data.forEach(function(subject, index, objects) {
                    subject['site'] =
                        subjectmap[subject['Nest 1: subjectnameoridentifier']]['site'];
                    subject['status'] =
                        subjectmap[subject['Nest 1: subjectnameoridentifier']]['status'];
                    subject['freeze'] =
                        subjectmap[subject['Nest 1: subjectnameoridentifier']]['freeze'];
                });
            }

            // case 2: Subject is lowest of two nests
            else if (table.config.id_cols.length == 2) {
                this.export.data.forEach(function(levelTwo, index, object) {
                    levelTwo['Nest 2: subjectnameoridentifier'] === 'Total' // remove Total rows
                        ? object.splice(index, 1)
                        : null;
                    if (typeof levelTwo.children != 'undefined') {
                        levelTwo.children[0].forEach(function(d) {
                            d.__data__['site'] =
                                subjectmap[d.__data__['Nest 2: subjectnameoridentifier']]['site'];
                            d.__data__['status'] =
                                subjectmap[d.__data__['Nest 2: subjectnameoridentifier']]['status'];
                            d.__data__['freeze'] =
                                subjectmap[d.__data__['Nest 2: subjectnameoridentifier']]['freeze'];
                        });
                    }
                });
            }

            // case 3: Subject is lowest of three nests
            else if (table.config.id_cols.length == 3) {
                this.export.data.forEach(function(levelThree, index, object) {
                    levelThree['Nest 3: subjectnameoridentifier'] === 'Total' // remove Total rows
                        ? object.splice(index, 1)
                        : null;
                    Object.values(levelThree)[Object.values(levelThree).length - 2] === 'Total' // want to remove totals from nest 2 too
                        ? object.splice(index, 1)
                        : null;
                    if (typeof levelThree.children != 'undefined') {
                        levelThree.children[0].forEach(function(levelTwo) {
                            if (typeof levelTwo.__data__.children != 'undefined') {
                                levelTwo.__data__.children[0].forEach(function(d) {
                                    d.__data__['site'] =
                                        subjectmap[d.__data__['Nest 3: subjectnameoridentifier']][
                                            'site'
                                        ];
                                    d.__data__['status'] =
                                        subjectmap[d.__data__['Nest 3: subjectnameoridentifier']][
                                            'status'
                                        ];
                                    d.__data__['freeze'] =
                                        subjectmap[d.__data__['Nest 3: subjectnameoridentifier']][
                                            'freeze'
                                        ];
                                });
                            }
                        });
                    }
                });
            }
        }
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

        this.filters.forEach(function(d, i) {
            table.export.data[i]['Filter'] = d.col;
            table.export.data[i]['Value'] = d.val;
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
                    _this.config.value_cols.indexOf(col) > -1 && col.indexOf('query') < 0
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
                return _this.config.value_cols.indexOf(col) > -1 && col.indexOf('query') < 0
                    ? d[col] !== 'N/A'
                        ? d[col] //Math.round(d[col]*100)
                        : ''
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
                    return [filter.col, filter.val];
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
        var t0 = performance.now();
        //begin performance test

        if (this.data.summarized.length) {
            customizeRows.call(this);
            customizeCells.call(this);
            addRowDisplayToggle.call(this);
            toggleCellAnnotations.call(this);
            dataExport.call(this);
        }

        //end performance test
        var t1 = performance.now();
        console.log('Call to onDraw took ' + (t1 - t0) + ' milliseconds.');
    }

    //utility functions
    //styles, configuration, and webcharts
    //table callbacks
    function crfHeatMap(element, settings) {
        var defaultSettings = Object.assign(
            {},
            configuration.rendererSettings(),
            configuration.webchartsSettings()
        );
        var mergedSettings = merge(defaultSettings, settings); //Merge user settings onto default settings.
        var syncedSettings = configuration.syncSettings(mergedSettings); //Sync properties within merged settings, e.g. data mappings.
        var syncedControlInputs = configuration.syncControlInputs(syncedSettings); //Sync merged settings with controls.

        var controls = webcharts.createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        });
        var table = webcharts.createTable(element, syncedSettings, controls);

        table.initial_config = syncedSettings;

        table.on('init', onInit);
        table.on('layout', onLayout);
        table.on('draw', onDraw);

        defineStyles.call(table);

        return table;
    }

    return crfHeatMap;
});
