The most straightforward way to customize the CRF Heat Map is by using a configuration object whose properties describe the behavior and appearance of the table.  Since the CRF Heat Map is a Webcharts `table` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/crf-heat-map/blob/master/src/configuration/webchartsSettings.js) as [described below](#webcharts-settings).  Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the CRF Heat Map to facilitate data mapping and other custom functionality.  These custom settings are described in detail below and are set in the [rendererSettings.js file](https://github.com/RhoInc/crf-heat-map/blob/master/src/configuration/rendererSettings.js).  All defaults can be overwritten by the passed configuration object.

# Renderer-specific settings
The sections below describe each crf-heat-map setting as of version 1.3.0.

## settings.nestings
`array`

an array of objects specifying the variables to nest the data by for calculations

**default:** 
```
undefined
```

### settings.nestings[].value_col
`string`

Value Column

**default:** none

### settings.nestings[].label
`string`

Label

**default:** none

### settings.nestings[].default_nesting
`boolean`

Default Nesting

**default:** none

### settings.nestings[].role
`string`

Specify Optional Role

**default:** none



## settings.value_cols
`array`

binary CRF flags and query frequencies that capture some status related to the case report form (CRF)

**default:** 
```
undefined
```

### settings.value_cols[].col
`string`

Variable Name

**default:** none

### settings.value_cols[].type
`string`

Variable Type

**default:** none

### settings.value_cols[].denominator
`string`

Denominator for Proportion Calculation

**default:** none

### settings.value_cols[].label
`string`

Table Header Label

**default:** none

### settings.value_cols[].description
`string`

Description for Info Bubbles

**default:** none



## settings.filter_cols
`array`

variables in the data with which to filter the data

**default:** 
```
undefined
```

### settings.filter_cols[].value_col
`string`

Variable Name

**default:** none

### settings.filter_cols[].label
`string`

Label

**default:** none

### settings.filter_cols[].multiple
`boolean`

Multi-select

**default:** none

### settings.filter_cols[].subject_export
`boolean`

Include variable in subject-level export

**default:** none



## settings.visit_order_col
`string`

Specifies variable for determining order of Visit ID

**default:** `"folder_ordinal"`



## settings.display_cell_annotations
`boolean`

displays cell annotations always or only on hover

**default:** `true`



## settings.expand_all
`boolean`

expands all nests so that no rows are hidden

**default:** `false`



## settings.sliders
`boolean`

Replaces input boxes with sliders for filtering rows

**default:** `false`



## settings.max_rows_warn
`number`

If the number of rows to be drawn exceeds this number when the user checks 'Expand All' they will be prompted for confirmation

**default:** `10000`



## settings.nesting_filters
`boolean`

Adds filters for each of the nesting variables

**default:** `true`

# Webcharts settings
The object below contains each Webcharts setting as of version 1.3.0.

```
{    return {        cols: null,        headers: null, // set in rendererSettings        applyCSS: true,        searchable: false,        sortable: false,        pagination: false,        exportable: true,        exports: ['csv', 'xlsx'],        dynamicPositioning: false    };}}
```