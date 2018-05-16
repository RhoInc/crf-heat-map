export const rendererSpecificSettings = {};

export const webchartsSettings = {
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
    filter_cols: ['sitename', 'ready_for_freeze', 'status','subset1','subset2','subset3'],
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

export default Object.assign({}, rendererSpecificSettings, webchartsSettings);

// Replicate settings in multiple places in the settings object
export function syncSettings(settings) {
    settings.cols = d3.merge([['id'], settings.value_cols]);
    return settings;
}



// Map values from settings to control inputs
export function syncControlInputs(settings) {
    const defaultControls = [
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
        }
    ];

    if (Array.isArray(settings.filters) && settings.filters.length > 0) {
        const otherFilters = settings.filters.map(filter => {
            const filterObject = {
                type: 'subsetter',
                value_col: filter.value_col || filter,
                label: filter.label || filter.value_col || filter
            };
            return filterObject;
        });

        return defaultControls.concat(otherFilters);
    } else return defaultControls;
}
