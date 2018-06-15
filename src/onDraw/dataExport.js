export default function dataExport() {
    const CSVarray = [];

    //header row
    const headers = d3.merge([
        this.config.id_cols,
        this.filters
            .map(filter => (
                this.controls.config.inputs
                    .find(input => input.value_col === filter.col)
                    .label
            )),
        this.config.headers
    ]);

    CSVarray.push(
        headers.map(header => `"${header.replace(/"/g, '""')}"`)
    );

    //data rows
    const id_cols = this.config.id_cols.map((id_col,i) => `Nest ${i+1}: ${id_col}`);
    const cols = d3.merge([
        id_cols,
        this.filters.map(filter => filter.col),
        this.config.value_cols
    ]);

    this.data.filtered.forEach((d,i) => {
        id_cols.forEach((id_col,j) => {
            const id_val = d.id.split(':')[j];
            d[id_col] = id_val
                ? j < id_cols.length - 1
                    ? id_val.substring(1)
                    : id_val
                : 'Total';
        });

        this.filters.forEach(filter => {
            d[filter.col] = filter.val;
        });

        //add rows to CSV array
        const row = cols.map((col,i) => {
            let value = this.config.value_cols.indexOf(col) > -1 && col.indexOf('query') < 0
                ? d3.format('%')(d[col])
                : d[col];

            if (typeof value === 'string') value = value.replace(/"/g, '""');

            return `"${value}"`;
        });

        CSVarray.push(row);
    });

    //transform CSV array into CSV string
    const CSV = new Blob([CSVarray.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const fileName = `CRF-Heat-Map-${d3.time.format('%Y-%m-%dT%H-%M-%S')(new Date())}.csv`;
    const link = this.wrap.select('.export#csv');

    if (navigator.msSaveBlob) {
        // IE 10+
        link.style({
            cursor: 'pointer',
            'text-decoration': 'underline',
            color: 'blue'
        });
        link.on('click', () => {
            navigator.msSaveBlob(CSV, fileName);
        });
    } else {
        // Browsers that support HTML5 download attribute
        if (link.node().download !== undefined) {
            var url = URL.createObjectURL(CSV);
            link.node().setAttribute('href', url);
            link.node().setAttribute('download', fileName);
        }
    }
}
