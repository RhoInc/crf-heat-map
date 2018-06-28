export default function rendererSettings() {
    return {
        nestings: [
            {
                value_col: 'sitename',
                label: 'Site',
                default: true
            },
            {
                value_col: 'subjectnameoridentifier',
                label: 'Subject ID',
                default: true
            },
            {
                value_col: 'foldername',
                label: 'Folder',
                default: false
            },
            {
                value_col: 'formoid',
                label: 'Form',
                default: false
            }
        ],
        value_cols: [
            'is_partial_entry',
            'DATA_PAGE_VERIFIED',
            'Ready_For_Freeeze',
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
