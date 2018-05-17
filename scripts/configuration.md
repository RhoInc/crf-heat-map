Currently Rave-Xplorer does not have any renderer specific settings. Since Rave-Xplorer is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/rave-Xplorer/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings. 

# Renderer-specific settings
There are no Renderer-specific settings at this time.

# Webcharts settings
The object below contains each Webcharts setting as of version 1.0.0.

```
{    id_cols: ['sitename', 'subjectnameoridentifier'],    value_cols: [        'is_partial_entry',        'is_verified',        'is_frozen',        'is_signed',        'is_locked',        'has_open_query',        'has_answered_query'    ],    filter_cols: ['sitename', 'ready_for_freeze', 'status'],    pagination: false,    searchable: false,    sortable: false,    headers: [        'ID',        'CRFs Entered',        'Source Data Verified',        'Frozen',        'Signed',        'Locked',        'Opened Queries',        'Answered Queries'    ],    cols: null}
```