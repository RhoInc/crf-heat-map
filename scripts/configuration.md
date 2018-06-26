The most straightforward way to customize the CRF Heat Map is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the CRF Heat Map is a Webcharts `table` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/crf-heat-map/blob/master/src/configuration/webchartsSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the CRF Heat Map to facilitate data mapping and other custom functionality. These custom settings are described in detail below and are set in the [rendererSettings.js file](https://github.com/RhoInc/crf-heat-map/blob/master/src/configuration/rendererSettings.js). All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each crf-heat-map setting as of version 1.0.0.

## settings.nestings
`array`

an array of objects specifying the variables to nest the data by for calculations

**default:** 
```
[
  {
    "value_col": "sitename",
    "label": "Site",
    "default": true
  },
  {
    "value_col": "subjectnameoridentifier",
    "label": "Subject ID",
    "default": true
  },
  {
    "value_col": "foldername",
    "label": "Folder",
    "default": false
  },
  {
    "value_col": "formoid",
    "label": "Form",
    "default": false
  }
]
```

### settings.nestings[].value_col
`string`

Value Column

**default:** none

### settings.nestings[].label
`string`

Label

**default:** none

### settings.nestings[].default
`boolean`

Default

**default:** none



## settings.value_cols
`array`

binary flag variables that capture some status related to the case report form (CRF)

**default:** 
```
[
  "is_partial_entry",
  "DATA_PAGE_VERIFIED",
  "is_frozen",
  "is_signed",
  "is_locked",
  "open_query_cnt",
  "answer_query"
]
```



## settings.filter_cols
`array`

variables in the data with which to filter the data

**default:** 
```
[
  "sitename",
  "FreezeFlg",
  "status",
  "subset1",
  "subset2",
  "subset3"
]
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
The object below contains each Webcharts setting as of version 1.0.0.

```
{    return {        cols: null,        headers: [            'ID',            'Entered',            'Source Data Verified',            'Frozen',            'Signed',            'Locked',            'Open',            'Answered'        ],        applyCSS: true,        searchable: false,        sortable: false,        pagination: false,        exportable: true,        exports: ['csv']    };}}
```