export default function rendererSettings() {
    return {
        site_col: 'sitename',
        id_col: 'subjectnameoridentifier',
        visit_col: 'folderinstancename',
        form_col: 'ecrfpagename',
        id_freeze_col: 'subjfreezeflg',
        id_status_col: 'status',
        nestings: [
            {
                settings_col: 'site_col',
                value_col: null, // set in syncSettings()
                label: 'Site',
                default_nesting: true
            },
            {
                settings_col: 'id_col',
                value_col: null, // set in syncSettings()
                label: 'Subject ID',
                default_nesting: true
            },
            {
                settings_col: 'visit_col',
                value_col: null, // set in syncSettings(0
                label: 'Folder',
                default_nesting: false
            },
            {
                settings_col: 'form_col',
                value_col: null, // set in syncSettings()
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
        filter_cols: ['subset1', 'subset2', 'subset3'], // set in syncSettings()
        display_cell_annotations: true,
        expand_all: false
    };
}
