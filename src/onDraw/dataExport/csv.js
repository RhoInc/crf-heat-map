export default function csv() {
    const context = this;
    const value_cols = this.config.value_cols.map(d => d.col);
    const CSVarray = [];

    var table = this;

    //add filters info after last column - similar second tab of xlsx
    this.export.headers.push('Filter', 'Value');
    this.export.cols.push('Filter', 'Value');

    this.export.data.forEach((d, i) => {
        d['Filter'] = '';
        d['Value'] = '';
    });

    this.filters.forEach((filter, i) => {
        if (i < this.export.data.length) {
            table.export.data[i]['Filter'] = this.export.filters[i];
            table.export.data[i]['Value'] =
                Array.isArray(filter.val) && filter.val.length < filter.choices.length
                    ? filter.val.join(', ')
                    : Array.isArray(filter.val) && filter.val.length === filter.choices.length
                    ? 'All'
                    : filter.val;
        } else
            table.export.data.push(
                Object.assign(
                    this.export.cols.reduce((acc, cur) => {
                        acc[cur] = '';
                        return acc;
                    }, {}),
                    {
                        Filter: filter.col,
                        Value: filter.val
                    }
                )
            );
    });

    //header row
    CSVarray.push(this.export.headers.map(header => `"${header.replace(/"/g, '""')}"`));

    //data rows
    this.export.data.forEach(d => {
        //add rows to CSV array
        const row = this.export.cols.map((col, i) => {
            let value =
                value_cols.indexOf(col) > -1 &&
                context.typeDict[col] == 'crfs' &&
                ['N/A', ''].indexOf(d[col]) < 0
                    ? d[col] * 100
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
}
