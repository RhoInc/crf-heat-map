(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory(require('webcharts')))
        : typeof define === 'function' && define.amd
            ? define(['webcharts'], factory)
            : (global.raveXplorer = factory(global.webCharts));
})(this, function(webcharts) {
    'use strict';

    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
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

    function defineStyles() {
        var styles = [
            '.row--hidden {' + '    display: none;' + '}',

            /* ID cells */

            '.cell--id {' + '    background: white;' + 'width: 90px;' + '}',
            '.row--expandable .cell--id {' +
                '    color: blue;' +
                '    cursor: pointer;' +
                '    text-decoration: underline;' +
                '}',
            '.cell--id--level1 {' + '    padding-left: 0em !important;' + '}',
            '.cell--id--level2 {' + '    padding-left: 1em !important;' + '}',
            '.cell--id--level3 {' + '    padding-left: 2em !important;' + '}',

            /* heat cells */

            '.cell--heat {' +
                '    text-align: center;' +
                '    color: transparent;' +
                '    width: 150px;' +
                '}',
            '.cell--heat--level1:hover,' +
                '.cell--heat--level2:hover,' +
                '.cell--heat--level3:hover {' +
                '    color: black;' +
                '}',
            '.cell--heat--level4:hover,' +
                '.cell--heat--level5:hover {' +
                '    color: white;' +
                '}',
            '.cell--heat--level1 {' + '    background: #eff3ff;' + '}',
            '.cell--heat--level2 {' + '    background: #bdd7e7;' + '}',
            '.cell--heat--level3 {' + '    background: #6baed6;' + '}',
            '.cell--heat--level4 {' + '    background: #3182bd;' + '}',
            '.cell--heat--level5 {' + '    background: #08519c;' + '}'
        ];

        //Attach styles to DOM.
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');
        document.getElementsByTagName('head')[0].appendChild(style);
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

    var rendererSpecificSettings = {};

    var webchartsSettings = {
        id_cols: ['sitename', 'subjectnameoridentifier'],
        value_cols: [
            'is_partial_entry',
            'is_verified',
            'is_frozen',
            'is_signed',
            'is_locked',
            'has_open_query',
            'has_answered_query'
        ],
        filter_cols: ['sitename', 'ready_for_freeze', 'status'],
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
                value_col: 'ready_for_freeze',
                label: 'Freeze Status'
            },
            {
                type: 'subsetter',
                value_col: 'status',
                label: 'Subject Status'
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

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (
                        var _iterator = variables[Symbol.iterator](), _step;
                        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                        _iteratorNormalCompletion = true
                    ) {
                        var variable = _step.value;
                        newD[variable] = d[variable];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
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
                            proportion: 1
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
                } else if (v[0].flag == 'is_verified') {
                    //If there's a denominator of zero we want to catch that - right now I'm saying they're 100% done, may change that
                    if (
                        v.filter(function(d) {
                            return d.needs_verification === '1';
                        }).length === 0
                    ) {
                        return {
                            raw: v,
                            proportion: 1
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
        return flatData;
    }

    function onInit() {
        this.data.initial = this.data.raw;

        var t0 = performance.now();
        this.data.raw = flattenData.call(this);
        var t1 = performance.now();
        console.log('Call to flattenData took ' + (t1 - t0) + ' milliseconds.');
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
            var t0 = performance.now();
            chart.data.raw = flattenData.call(chart);
            var t1 = performance.now();
            console.log('Call to flattenData took ' + (t1 - t0) + ' milliseconds.');
            chart.draw();
        });
    }

    function drawLegend() {
        var chart = this;

        var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

        console.log(chart);

        var legendHeight = 60;
        var legendWidth = 1500;

        var rectHeight = 20;
        var rectWidth = 60;

        d3
            .selectAll('.wc-chart')
            .insert('svg', ':first-child')
            .classed('legend', true)
            .attr('width', legendWidth)
            //      .attr(x, 200)
            .attr('height', legendHeight)
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
                return rectWidth * i + 95;
            })
            .attr('y', (legendHeight - rectHeight) / 2);

        // Tick Labels for Top Axis (Sums)
        var topTextData = ['>24', '17-24', '9-16', '1-8', '0'];

        d3
            .select('svg.legend')
            .append('line') // attach a line
            .style('stroke', 'black') // colour the line
            .attr('x1', 90 + 160 * 5) // x position of the first end of the line
            .attr('y1', 15) // y position of the first end of the line
            .attr('x2', 90 + 160 * 5) // x position of the second end of the line
            .attr('y2', 60);

        //Information for Queries (Sums)
        d3
            .select('svg.legend')
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
                return rectWidth * i + (95 + 160 * 5);
            })
            .attr('y', (legendHeight - rectHeight) / 2);

        var bottomTextData = ['0%', '25%', '50%', '75%', '100%'];

        d3
            .select('svg.legend')
            .selectAll('g')
            .data(bottomTextData)
            .enter()
            .append('text')
            .text(function(d) {
                return d;
            })
            .attr('x', function(d, i) {
                return rectWidth * i + 95;
            })
            .attr('y', (legendHeight - rectHeight) / 2 + rectHeight + 15)
            .append('svg:tspan')
            .attr('x', 0)
            .attr('dy', 20);

        // Tick Labels for Bottom Axis (Proportions)

        //Information for Proportions
        d3
            .select('svg.legend')
            .selectAll('g')
            .data(topTextData)
            .enter()
            .append('text')
            .text(function(d) {
                return d;
            })
            .attr('x', function(d, i) {
                console.log(chart);
                console.log(d3.select('th.is_partial_entry'));
                return rectWidth * i + (95 + 160 * 5);
            })
            .attr('y', (legendHeight - rectHeight) / 2 + rectHeight + 15)
            .append('svg:tspan')
            .attr('x', 0)
            .attr('dy', 20);
        //      .text('Forms →');
    }

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

    function applyFilters() {
        var _this = this;

        //If there are filters, return a filtered data array of the raw data.
        //Otherwise return the raw data.

        this.data.filtered_ = this.filters //need to make this unique for the if in flattenData
            ? clone(this.data.initial).filter(function(d) {
                  var match = true;
                  _this.filters.forEach(function(filter) {
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

    function onLayout() {
        var chart = this;
        var selects = this.controls.wrap.selectAll('select');

        selects.on('change', function() {
            // Get the selected levels
            var selectedfilterLevels = [];
            selects.each(function(d, i) {
                selectedfilterLevels.push(this.value);
            });

            // Update filters to reflect the selected levels
            chart.filters.forEach(function(d, i) {
                d.val = selectedfilterLevels[i];
            });

            applyFilters.call(chart);
            var t0 = performance.now();
            chart.data.raw = flattenData.call(chart);
            var t1 = performance.now();
            console.log('Call to flattenData took ' + (t1 - t0) + ' milliseconds.');

            chart.draw();
        });

        createNestControl.call(chart);
        drawLegend.call(chart);
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
                            d.text === 1
                                ? 5
                                : d.text > 0.75
                                    ? 4
                                    : d.text > 0.5
                                        ? 3
                                        : d.text > 0.25
                                            ? 2
                                            : 1;
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
                        ? d3.format('%')(d.text)
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

    function onDraw() {
        var t0 = performance.now();
        customizeRows.call(this);
        customizeCells.call(this);
        addRowDisplayToggle.call(this);
        var t1 = performance.now();
        console.log('Call to onDraw took ' + (t1 - t0) + ' milliseconds.');
    }

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

        chart.on('init', onInit);
        chart.on('layout', onLayout);
        chart.on('draw', onDraw);

        defineStyles();

        return chart;
    }

    return raveXplorer;
});
