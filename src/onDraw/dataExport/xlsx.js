export default function xlsx() {
    const sheetName = 'Selected Data';
    const options = {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary'
    };
    const arrayOfArrays = this.export.data
        .map(d => (
            this.export.cols
                .map(col => (
                    this.config.value_cols.indexOf(col) > -1 && col.indexOf('query') < 0
                        ? d[col] !== 'N/A'
                            ? Math.round(d[col]*100)
                            : ''
                        : d[col]
                ))
        )); // convert data from array of objects to array of arrays.
    const workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    const cols = [];

    //Convert headers and data from array of arrays to sheet.
    workbook.Sheets[sheetName] = XLSX.utils.aoa_to_sheet(
        [this.export.headers].concat(arrayOfArrays)
    );

    //Add filters to spreadsheet.
    workbook.Sheets[sheetName]['!autofilter'] = {
        ref: `A1:${String.fromCharCode(64 + this.export.cols.length)}${this.export.data.length + 1}`
    };

    //Define column widths in spreadsheet.
    this.table.selectAll('thead tr th').each(function() {
        cols.push({ wpx: this.offsetWidth });
    });
    workbook.Sheets[sheetName]['!cols'] = cols;

    const xlsx = XLSX.write(workbook, options),
        s2ab = function(s) {
            const buffer = new ArrayBuffer(s.length),
                view = new Uint8Array(buffer);

            for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;

            return buffer;
        }; // convert spreadsheet to binary or something, i don't know

    //transform CSV array into CSV string
    const blob = new Blob([s2ab(xlsx)], { type: 'application/octet-stream;' });
    const fileName = `webchartsTableExport_${d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date())}.xlsx`;
    const link = this.wrap.select('.export#xlsx');

    if (navigator.msSaveBlob) {
        // IE 10+
        link.style({
            cursor: 'pointer',
            'text-decoration': 'underline',
            color: 'blue'
        });
        link.on('click', () => {
            navigator.msSaveBlob(blob, fileName);
        });
    } else {
        // Browsers that support HTML5 download attribute
        if (link.node().download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.node().setAttribute('href', url);
            link.node().setAttribute('download', fileName);
        }
    }
}
