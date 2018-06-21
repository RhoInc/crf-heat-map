export default function csv() {
    const CSVarray = [];

    var table = this;

    //add filters info after last column - similar second tab of xlsx
    this.export.headers.push('Filter', 'Value')
    this.export.cols.push('Filter', 'Value')

    //header row
    CSVarray.push(this.export.headers.map(header => `"${header.replace(/"/g, '""')}"`));


    this.export.data.forEach((d,i) => {
      d['Filter'] = ''
      d['Value'] = ''
    })


    this.filters.forEach((d,i) => {
      table.export.data[i]['Filter'] = d.col ;
      table.export.data[i]['Value'] = d.val;
    })


    //data rows
    this.export.data.forEach(d => {
        //add rows to CSV array
        const row = this.export.cols.map((col, i) => {
            let value =
                this.config.value_cols.indexOf(col) > -1 && col.indexOf('query') < 0
                    ? Math.round(d[col] * 100)
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
        navigator.msSaveBlob(CSV, fileName);
    } else {
        // Browsers that support HTML5 download attribute
        if (link.node().download !== undefined) {
            var url = URL.createObjectURL(CSV);
            link.node().setAttribute('href', url);
            link.node().setAttribute('download', fileName);
        }
    }

    // delete export so that xlsx doesn't have filter cols in tab 1
    delete this.export
}
