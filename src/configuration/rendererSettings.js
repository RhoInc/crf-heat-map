export default function rendererSettings() {
    return {
        id_cols: ['sitename', 'subjectnameoridentifier'],
        id_colls: [
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
          },
        ],
        value_cols: [
            'is_partial_entry',
            'DATA_PAGE_VERIFIED',
            'is_frozen',
            'is_signed',
            'is_locked',
            'open_query_cnt',
            'answer_query_cnt'
        ],
        filter_cols: ['sitename', 'FreezeFlg', 'status', 'subset1', 'subset2', 'subset3'],
        display_cell_annotations: true,
        expand_all: false
    };
}
