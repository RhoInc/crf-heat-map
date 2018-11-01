export default function webchartsSettings() {
    return {
        cols: null,
        headers: null, // set in rendererSettings
        applyCSS: true,
        searchable: false,
        sortable: false,
        pagination: false,
        exportable: true,
        exports: ['csv', 'xlsx'],
        dynamicPositioning: false
    };
}
