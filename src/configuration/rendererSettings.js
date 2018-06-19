export default function rendererSettings() {
    return {
        id_cols: ['sitename', 'subjectnameoridentifier'],
        value_cols: [
            'is_partial_entry',
            'DATA_PAGE_VERIFIED',
            'is_frozen',
            'is_signed',
            'is_locked',
            'has_open_query',
            'has_answered_query'
        ],
        filter_cols: ['sitename', 'FreezeFlg', 'status', 'subset1', 'subset2', 'subset3'],
        display_cell_annotations: true
    };
}
