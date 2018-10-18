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
            {
                col: 'is_partial_entry',
                type: 'crfs',
                label: 'Entered',
                description: 'Data have been submitted in the EDC system.'
            },
            {
                col: 'verified',
                type: 'crfs',
                denominator: 'needs_verification',
                label: 'Source Data Verified',
                description: 'All required fields have source data verification complete in EDC.'
            },
            {
                col: 'ready_for_freeze',
                type: 'crfs',
                label: 'Ready for Freeze',
                description:
                    'All required cleaning is complete (e.g. SDV, queries resolved) and data are ready to be frozen in EDC.'
            },
            {
                col: 'is_frozen',
                type: 'crfs',
                label: 'Frozen',
                description: 'Data have been frozen in the EDC system.'
            },
            {
                col: 'is_signed',
                type: 'crfs',
                denominator: 'needs_signature',
                label: 'Signed',
                description: 'Data have been signed in the EDC system.'
            },
            {
                col: 'is_locked',
                type: 'crfs',
                label: 'Locked',
                description: 'Data have been locked in the EDC system.'
            },
            {
                col: 'open_query_ct',
                type: 'queries',
                label: 'Open',
                description: 'Site has not responded to issue.'
            },
            {
                col: 'answer_query_ct',
                type: 'queries',
                label: 'Answered',
                description: 'Site has responded to issue, DM needs to review.'
            }
        ],
        filter_cols: ['subset1', 'subset2', 'subset3'],
        display_cell_annotations: true,
        expand_all: true
    };
}
