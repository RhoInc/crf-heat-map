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
            'has_open_query',
            'has_answered_query',
            'is_frozen',
            'is_signed',
            'is_locked'
        ],
        filter_cols: ['sitename', 'ready_for_freeze', 'status'],
        pagination: false,
        searchable: false,
        sortable: false,
        headers: [
            'ID',
            'CRFs Entered',
            'Source Data Verified',
            'Opened Queries',
            'Answered Queries',
            'Frozen',
            'Signed',
            'Locked'
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
        var longData = [];
        data.forEach(function(d) {
            settings.value_cols.forEach(function(flag) {
                var newD = {};
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (
                        var _iterator = Object.keys(d)[Symbol.iterator](), _step;
                        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                        _iteratorNormalCompletion = true
                    ) {
                        var key = _step.value;
                        newD[key] = d[key];
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

                newD.flag = flag;
                longData.push(newD);
            });
        });

        //make key variable for specified levels
        longData.forEach(function(d) {
            d.nestKey = '';
            settings.id_cols
                .filter(function(d, i) {
                    return i < level;
                })
                .forEach(function(l, i) {
                    d.nestKey = d.nestKey + ':' + d[l];
                });
            d.nestKey = '' + level + ':' + d.nestKey.slice(1);
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
        this.data.raw = flattenData.call(this);
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
            chart.data.raw = flattenData.call(chart);
            chart.draw();
        });
    }

    function drawLegend() {
        var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

        var heatLegend = this.wrap
            .insert('svg', ':first-child')
            .classed('legend', true)
            .attr('width', 500)
            .attr('height', 100)
            .selectAll('.legend')
            .data(colors)
            .enter();

        heatLegend
            .append('rect')
            .style({
                fill: function fill(d) {
                    return d;
                },
                'fill-opacity': 1
            })
            .attr('width', 100)
            .attr('height', 20)
            .attr('x', function(d, i) {
                return 100 * i;
            })
            .attr('y', 40);

        //Information for Proportions
        heatLegend
            .append('text')
            .text(function(d, i) {
                if (i == 0) {
                    return '0% of Forms';
                } else if (i == 2) {
                    return '50%';
                } else if (i == 4) {
                    return '100%';
                }
            })
            .attr('x', function(d, i) {
                return 100 * i;
            })
            .attr('y', 80);

        //Information for Queries (Sums)
        heatLegend
            .append('text')
            .text(function(d, i) {
                if (i == 0) {
                    return '24';
                } else if (i == 2) {
                    return '12';
                } else if (i == 4) {
                    return '0 Queries';
                }
            })
            .attr('x', function(d, i) {
                if (i == 4) {
                    return 435;
                } else return 100 * (i + 1) - 17;
            })
            .attr('y', 30);
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
            chart.data.raw = flattenData.call(chart);
            chart.draw();
        });

        createNestControl.call(chart);
        drawLegend.call(chart);
    }

    function onDraw() {
        var config = this.config;

        var colors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];
        var colorsReversed = colors.slice().reverse();

        var colorScaleProp = d3.scale
            .quantile()
            .domain([0, 1])
            .range(colors);

        //Separate Color Scale for Queries
        var colorScaleSum = d3.scale
            .quantile()
            .domain([0, 30])
            .range(colorsReversed);

        var rows = this.tbody.selectAll('tr');
        var cells = rows
            .selectAll('td')
            .style('background', function(d) {
                if (d.col.includes('query')) {
                    return colorScaleSum(d.text);
                } else return d.col == 'id' ? 'white' : colorScaleProp(d.text);
            })
            .text(function(d) {
                return d.col.includes('query') ? d.text : d3.format('0.1%')(d.text);
            });

        //format values cells
        cells
            .filter(function(d) {
                return d.col != 'id';
            })
            .style('text-align', 'center')
            .style('color', 'transparent')
            .style('width', '100px')
            .on('mouseover', function() {
                d3.select(this).style('color', function(d) {
                    if (d.col.includes('query')) return +d.text > 12 ? 'black' : 'white';
                    else return d.text > 0.5 ? 'white' : 'black';
                });
            })
            .on('mouseout', function() {
                d3.select(this).style('color', 'transparent');
            });

        //format id cells
        rows.each(function(d) {
            var labelVar = config.id_cols[d.level - 1];
            var label = d[labelVar];
            d3
                .select(this)
                .select('td')
                .text(label)
                .style('padding-left', function(d) {
                    return d.level - 1 + 'em';
                });
        });

        //hide nested rows
        rows
            .filter(function(d) {
                return d.level > 1;
            })
            .style('display', 'none');

        var expandable_rows = rows
            .filter(function(d) {
                return d.level < config.id_cols.length;
            })
            .classed('collapsed', true)
            .select('td')
            .style('color', 'blue')
            .style('text-decoration', 'underline')
            .style('cursor', 'pointer');

        //get children for each row
        expandable_rows.each(function(d) {
            var matchVars = config.id_cols.filter(function(f, i) {
                return i <= d.level - 1;
            });

            d.children = rows.filter(function(r) {
                return r.level == d.level + 1;
            });
            matchVars.forEach(function(mv) {
                d.children = d.children.filter(function(r) {
                    return d[mv] == r[mv];
                });
            });
        });

        expandable_rows.on('click', function(d) {
            var row = d3.select(this.parentNode);
            var collapsed = !row.classed('collapsed');

            row
                .classed('collapsed', collapsed) //toggle the class
                .classed('expanded', !collapsed); //toggle the class

            function iterativeCollapse(d) {
                if (d.children) {
                    d.children.style('display', 'none');
                    d.children.each(function(di) {
                        iterativeCollapse(di);
                    });
                }
            }

            if (collapsed) {
                iterativeCollapse(d); //hide the whole tree
            } else {
                d.children.style('display', null); //show just the immediate children
            }
        });
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

        return chart;
    }

    return raveXplorer;
});
