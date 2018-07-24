export default function xlsx() {
    const sheetName = 'CRF Summary';
    const options = {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary'
    };
    const arrayOfArrays = this.export.data.map(d =>
        this.export.cols.map(
            col =>
                this.config.value_cols.indexOf(col) > -1 &&
                col.indexOf('query') < 0 &&
                ['N/A', ''].indexOf(d[col]) < 0
                    ? d[col]
                    : d[col]
        )
    ); // convert data from array of objects to array of arrays.
    const workbook = {
        SheetNames: [sheetName, 'Current Filters'],
        Sheets: {}
    };

    //Convert headers and data from array of arrays to sheet.
    workbook.Sheets[sheetName] = XLSX.utils.aoa_to_sheet(
        [this.export.headers].concat(arrayOfArrays)
    );
    const sheet = workbook.Sheets[sheetName];

    //Format percentages.
    const cols = this.export.cols.map((col, i) => {
        return {
            name: col,
            column: String.fromCharCode(i + 65)
        };
    });
    const pctCols = cols.filter(
        col => this.config.value_cols.indexOf(col.name) > -1 && col.name.indexOf('query') < 0
    );
    const pctCells = Object.keys(sheet).filter(
        key => pctCols.map(col => col.column).indexOf(key.replace(/\d+/, '')) > -1
    );
    pctCells.forEach(pctCell => {
        sheet[pctCell].z = '0%';
    });

    //Add filters to spreadsheet.
    workbook.Sheets[sheetName]['!autofilter'] = {
        ref: `A1:${String.fromCharCode(64 + this.export.cols.length)}${this.export.data.length + 1}`
    };

    //Define column widths in spreadsheet.
    workbook.Sheets[sheetName]['!cols'] = this.export.cols.map((col, i) => {
        return {
            wpx:
                this.config.value_cols.indexOf(col) > -1
                    ? 75
                    : i < this.config.id_cols.length
                        ? 125
                        : 100
        };
    });

    //Write current filters to second sheet.
    workbook.Sheets['Current Filters'] = XLSX.utils.aoa_to_sheet(
        [['Filter', 'Value']].concat(
            this.filters.map(filter => {
                return [
                    filter.col,
                    Array.isArray(filter.val) && filter.val.length < filter.choices.length
                        ? filter.val.join(', ')
                        : Array.isArray(filter.val) && filter.val.length === filter.choices.length
                            ? 'All'
                            : filter.val
                ];
            })
        )
    );

    const xlsx = XLSX.write(workbook, options),
        s2ab = function(s) {
            const buffer = new ArrayBuffer(s.length),
                view = new Uint8Array(buffer);

            for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;

            return buffer;
        }; // convert spreadsheet to binary or something, i don't know

    //transform CSV array into CSV string
    const blob = new Blob([s2ab(xlsx)], { type: 'application/octet-stream;' });
    const fileName = `CRF-Summary-${d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date())}.xlsx`;
    const link = this.wrap.select('.export#xlsx');

    if (navigator.msSaveBlob) {
        // IE 10+
        link.style({
            cursor: 'pointer',
            'text-decoration': 'underline',
            color: 'blue'
        });
        navigator.msSaveBlob(blob, fileName);
    } else {
        // Browsers that support HTML5 download attribute
        if (link.node().download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.node().setAttribute('href', url);
            link.node().setAttribute('download', fileName);
        }
    }
}
