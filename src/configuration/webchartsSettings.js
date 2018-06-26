export default function webchartsSettings() {
    return {
        cols: null,
        headers: [
            'ID',
            'Entered',
            'Source Data Verified',
            'Frozen',
            'Signed',
            'Locked',
            'Open',
            'Answered'
        ],
        applyCSS: true,
        searchable: false,
        sortable: false,
        pagination: false,
        exportable: true,
        exports: ['csv']
    };
}
