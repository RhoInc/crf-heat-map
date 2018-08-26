export default function controlInputs() {
    return [
        {
            type: 'subsetter',
            value_col: 'sitename',
            label: 'Site'
        },
        {
            type: 'subsetter',
            value_col: 'subjfreezeflg',
            label: 'Subject Freeze Status'
        },
        {
            type: 'subsetter',
            value_col: 'status',
            label: 'Subject Status',
            multiple: true
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
        },
        {
            type: 'checkbox',
            option: 'display_cell_annotations',
            label: 'Display Cell Annotations'
        },
        {
            type: 'checkbox',
            option: 'expand_all',
            label: 'Expand All'
        }
    ];
}
