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
            {col: 'is_partial_entry', type: 'crfs', label: 'Entered'},
            {col: 'verified', type : 'crfs', denominator : 'needs_verification', label: 'Source Data Verified'},
            {col: 'ready_for_freeze', type : 'crfs', label: 'Ready for Freeze'},
            {col: 'is_frozen', type : 'crfs', label: 'Frozen'},
            {col: 'is_signed', type : 'crfs', denominator : 'needs_signature', label: 'Signed'},
            {col: 'is_locked', type : 'crfs', label: 'Locked'},
            {col: 'open_query_ct', type : 'queries', label: 'Open'},
            {col: 'answer_query_ct', type : 'queries', label: 'Answered'}
        ],
        filter_cols: ['subset1', 'subset2', 'subset3'], // set in syncSettings()
        display_cell_annotations: true,
        expand_all: false
    };
}
