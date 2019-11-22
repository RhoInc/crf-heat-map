The most straightforward way to customize the CRF Heat Map is by using a configuration object whose properties describe the behavior and appearance of the table.  Since the CRF Heat Map is a Webcharts `table` object, many default Webcharts settings are set in the [webchartsSettings.js file](https://github.com/RhoInc/crf-heat-map/blob/master/src/configuration/webchartsSettings.js) as [described below](#webcharts-settings).  Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the CRF Heat Map to facilitate data mapping and other custom functionality.  These custom settings are described in detail below and are set in the [rendererSettings.js file](https://github.com/RhoInc/crf-heat-map/blob/master/src/configuration/rendererSettings.js).  All defaults can be overwritten by the passed configuration object.

# Renderer-specific settings
The sections below describe each crf-heat-map setting as of version 2.0.1.

## settings.site_col
`string`

Specifies Site variable for nesting

**default:** `"sitename"`



## settings.id_col
`string`

Specifies Subject variable for nesting and subject-level export

**default:** `"subjectnameoridentifier"`



## settings.visit_col
`string`

Specifies Visit variable for nesting

**default:** `"folderinstancename"`



## settings.form_col
`string`

Specifies Form variable for nesting

**default:** `"ecrfpagename"`



## settings.value_cols
`array`

binary CRF flags and query frequencies that capture some status related to the case report form (CRF)

**default:** 
```
[
  {
    "col": "is_partial_entry",
    "type": "crfs",
    "label": "Entered",
    "description": "Data have been submitted in the EDC system."
  },
  {
    "col": "verified",
    "type": "crfs",
    "denominator": "needs_verification",
    "label": "Source Data Verified",
    "description": "All required fields have source data verification complete in EDC."
  },
  {
    "col": "ready_for_freeze",
    "type": "crfs",
    "label": "Ready for Freeze",
    "description": "All required cleaning is complete (e.g. SDV, queries resolved) and data are ready to be frozen in EDC."
  },
  {
    "col": "is_frozen",
    "type": "crfs",
    "label": "Frozen",
    "description": "Data have been frozen in the EDC system."
  },
  {
    "col": "is_signed",
    "type": "crfs",
    "denominator": "needs_signature",
    "label": "Signed",
    "description": "Data have been signed in the EDC system."
  },
  {
    "col": "is_locked",
    "type": "crfs",
    "label": "Locked",
    "description": "Data have been locked in the EDC system."
  },
  {
    "col": "open_query_ct",
    "type": "queries",
    "label": "Open",
    "description": "Site has not responded to issue."
  },
  {
    "col": "answer_query_ct",
    "type": "queries",
    "label": "Answered",
    "description": "Site has responded to issue, DM needs to review."
  }
]
```

### settings.value_cols[].col
`string`

Variable name

**default:** none

### settings.value_cols[].type
`string`

Variable type

**default:** none

### settings.value_cols[].denominator
`string`

Variable to subset proportion calculations with. Generally this impacts only the denominator (e.g. you want the % of signed forms out of those that needed to be signed, not out of any forms that could be signed). Only for use with type='crfs'.

**default:** none

### settings.value_cols[].label
`string`

Table header label

**default:** none

### settings.value_cols[].description
`string`

Variable description that appears when hovering over table header

**default:** none



## settings.filter_cols
`array`

Variables 

**default:** 
```
[
  {
    "value_col": "sitename",
    "label": "Site"
  },
  {
    "value_col": "subjectnameoridentifier",
    "label": "Subject ID"
  },
  {
    "value_col": "foldername",
    "label": "Folder"
  },
  {
    "value_col": "architectformname",
    "label": "Form"
  },
  {
    "value_col": "status",
    "label": "Subject Status",
    "multiple": true,
    "subject_export": true
  },
  {
    "value_col": "subjfreezeflg",
    "label": "Subject Freeze Status",
    "subject_export": true
  },
  {
    "value_col": "subset1",
    "label": "Subset 1"
  },
  {
    "value_col": "subset2",
    "label": "Subset 2"
  },
  {
    "value_col": "subset3",
    "label": "Subset 3"
  }
]
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

**default:** `false`

### settings.filter_cols[].subject_export
`boolean`

Include variable in subject-level export

**default:** `false`



## settings.visit_order_col
`string`

Variable for determining order of Visit column

**default:** `"folder_ordinal"`



## settings.form_order_col
`string`

Variable for determining order of Form column

**default:** `"form_ordinal"`



## settings.default_nesting
`array`

Variables to summarize chart by on initial rendering

**default:** 
```
[
  "site_col",
  "id_col"
]
```



## settings.display_fraction
`boolean`

Displays fractions for crf values alongside calculated percentages

**default:** `false`



## settings.expand_all
`boolean`

Expands all nests so that no rows are hidden

**default:** `false`



## settings.sliders
`boolean`

Replaces input boxes with sliders for filtering rows

**default:** `false`



## settings.max_rows_warn
`number`

Number of rows above which the user will be prompted for confirmation when expanding rows

**default:** `10000`

# Webcharts settings
The object below contains each Webcharts setting as of version 2.0.1.

```
{    return {        cols: null,        headers: null, // set in rendererSettings        applyCSS: true,        searchable: false,        sortable: false,        pagination: false,        exportable: true,        exports: ['csv', 'xlsx'],        dynamicPositioning: false    };}}
```