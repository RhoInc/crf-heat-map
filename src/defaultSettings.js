export const rendererSpecificSettings = {};

// Set this as variable so I can use it in the merge
var value_columns = [
  'is_partial_entry',
  'is_verified',
  'has_open_query',
  'has_answered_query',
  'is_frozen',
  'is_signed',
  'is_locked'
];

export const webchartsSettings = {
  id_cols: ['sitename', 'subjectnameoridentifier'],
  value_cols: value_columns,
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
  cols: d3.merge([
    ['id'], value_columns
  ])
};

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

// Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
  return settings;
}

// Default Control objects
export const controlInputs = [{
    // need to deal with filtering in the flattenData function() at some point - these do not work as expected.
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

// Map values from settings to control inputs
export function syncControlInputs(controlInputs, settings) {
  //Sync measure control.

  return controlInputs;
}