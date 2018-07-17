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
                value_col: 'foldername',
                label: 'Folder',
                default_nesting: false
            },
            {
                value_col: 'formoid',
                label: 'Form',
                default_nesting: false
            }
        ],
        value_cols: [
            'is_partial_entry',
            'DATA_PAGE_VERIFIED',
            'ready_for_freeze',
            'is_frozen',
            'is_signed',
            'is_locked',
            'open_query_cnt',
            'answer_query_cnt'
        ],
        filter_cols: ['sitename', 'SubjFreezeFlg', 'status', 'subset1', 'subset2', 'subset3'],
        display_cell_annotations: true,
        expand_all: false
    };
}
