export default function webchartsSettings() {
    return {
        cols: null,
        headers: [
            'ID',
            'CRFs Entered',
            'Source Data Verified',
            'Frozen',
            'Signed',
            'Locked',
            'Opened Queries',
            'Answered Queries'
        ],
        applyCSS: true,
        searchable: false,
        sortable: false,
        pagination: false,
        exportable: true
    };
}
