Currently Rave-Xplorer does not have any renderer specific settings. Since Rave-Xplorer is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/rave-Xplorer/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings. 

# Renderer-specific settings
The sections below describe each rave-xplorer setting as of version 1.0.0.

## settings.id_cols
`array`

the data will be summarized by each variable in this list

**default:** 
```
[
  "sitename",
  "subjectnameoridentifier"
]
```



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
  "has_open_query",
  "has_answered_query"
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

# Webcharts settings
The object below contains each Webcharts setting as of version 1.0.0.

```
{    return {        cols: null,        headers: [            'ID',            'CRFs Entered',            'Source Data Verified',            'Frozen',            'Signed',            'Locked',            'Opened Queries',            'Answered Queries'        ],        applyCSS: true,        searchable: false,        sortable: false,        pagination: false,        exportable: true,        exports: ['csv']    };}}
```