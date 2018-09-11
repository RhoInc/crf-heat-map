The most straightforward way to customize the CRF Heat Map is by using a configuration object whose properties describe the behavior and appearance of the table.  Since the CRF Heat Map is a Webcharts `table` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/crf-heat-map/blob/master/src/configuration/webchartsSettings.js) as [described below](#webcharts-settings).  Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the CRF Heat Map to facilitate data mapping and other custom functionality.  These custom settings are described in detail below and are set in the [rendererSettings.js file](https://github.com/RhoInc/crf-heat-map/blob/master/src/configuration/rendererSettings.js).  All defaults can be overwritten by the passed configuration object.

# Renderer-specific settings
The sections below describe each crf-heat-map setting as of version 1.0.4.

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



## settings.value_cols
`array`

binary CRF flags and query frequencies that capture some status related to the case report form (CRF)

**default:** 
```
undefined
```



## settings.filter_cols
`array`

variables in the data with which to filter the data

**default:** 
```
undefined
```



## settings.display_cell_annotations
`boolean`

displays cell annotations always or only on hover

**default:** `true`



## settings.expand_all
`boolean`

expands all nests so that no rows are hidden

**default:** `false`

# Webcharts settings
The object below contains each Webcharts setting as of version 1.0.4.

```
{    return {        cols: null,        headers: [            'ID',            'Entered',            'Source Data Verified',            'Ready for Freeze',            'Frozen',            'Signed',            'Locked',            'Open',            'Answered'        ],        applyCSS: true,        searchable: false,        sortable: false,        pagination: false,        exportable: true,        exports: ['csv', 'xlsx']    };}}
```