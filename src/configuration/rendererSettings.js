export default function rendererSettings() {
    return {
        nestings: [
            {
                value_col: 'sitename',
                label: 'Site',
                default_nesting: true,
                role: 'site_col'
            },
            {
                value_col: 'subjectnameoridentifier',
                label: 'Subject ID',
                default_nesting: true,
                role: 'id_col'
            },
            {
                value_col: 'folderinstancename',
                label: 'Folder',
                default_nesting: false,
                role: 'visit_col'
            },
            {
                value_col: 'ecrfpagename',
                label: 'Form',
                default_nesting: false,
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
        filter_cols: [
          {
            value_col: 'subset1',
            label: 'Subset 1'
          },
          {
            value_col: 'subset2',
            label: 'Subset 2'
          },
          {
            value_col: 'subset3',
            label: 'Subset 3'
          },
          {
            value_col: 'subjfreezeflg',
            label: 'Subject Freeze Status',
            multiple: true
          },
          {
            value_col: 'status',
            label: "Subject Status"
          }
        ],
        visit_order_col: 'folder_ordinal',
        display_cell_annotations: true,
        expand_all: false,
        sliders: false,
        max_rows_warn: 10000,
        nesting_filters: true
    };
}
