export default function rendererSettings() {
    return {
        nestings: [
            {
                value_col: 'sitename',
                label: 'Site',
                default_nesting: true
            },
            {
                value_col: 'subjectnameoridentifier',
                label: 'Subject ID',
                default_nesting: true
            },
            {
                value_col: 'folderinstancename',
                label: 'Folder',
                default_nesting: false
            },
            {
                value_col: 'ecrfpagename',
                label: 'Form',
                default_nesting: false
            }
        ],
        value_cols: [
            'is_partial_entry',
            'verified',
            'ready_for_freeze',
            'is_frozen',
            'is_signed',
            'is_locked',
            'open_query_ct',
            'answer_query_ct'
        ],
        filter_cols: ['sitename', 'subjfreezeflg', 'status', 'subset1', 'subset2', 'subset3'],
        display_cell_annotations: true,
        expand_all: false
    };
}
