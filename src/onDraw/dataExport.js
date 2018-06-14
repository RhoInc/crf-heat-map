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
    const cols = d3.merge([
        this.config.id_cols,
        this.filters.map(filter => filter.col),
        this.config.cols
    ]);
    console.log(cols);
    this.data.filtered.forEach((d, i) => {

        //add rows to CSV array
        const row = cols.map((col,i) => {
            let value = i < this.config.id_cols.length
                ? this.config.id_cols[i]
                : i < this.config.id_cols.length + this.filters.length
                    ? this.filters[i - this.config.id_cols.length].val
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
