import headerStyle from './defineXLSX/headerStyle';
import bodyStyle from './defineXLSX/bodyStyle';
import workBook from './defineXLSX/workBook';
import addCell from './defineXLSX/addCell';
import clone from '../../../util/clone';

export default function defineXLSX() {
    const chart = this;
    const value_cols = this.config.value_cols.map(d => d.col);
    const wb = new workBook();
    const filter_col_width = { wpx: 125 };
    const ws = {}; //sheet for heatmao
    const filter_sheet = {}; //sheet for filter values
    const cols = [];
    const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    const wbOptions = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    };

    const filterRange =
        'A1:' + String.fromCharCode(64 + this.export.cols.length) + (this.export.data.length + 1);

    // Header row
    this.export.headers.forEach((header, col) => {
        addCell(ws, header, 'c', clone(headerStyle), range, 0, col);
    });

    // Data rows
    const stylesheet = crfHeatMap().style.textContent;
    this.export.data.forEach((d, row) => {
        this.export.cols.forEach((variable, col) => {
            const value_col = value_cols.indexOf(variable) > -1 ? true : false;
            const value =
                value_col && !isNaN(d[variable + '_value']) ? d[variable + '_value'] : d[variable];
            const cellStyle = clone(bodyStyle);

            if (value_col) {
                var level;
                if (chart.typeDict[variable] == 'queries')
                    level = value === 0 ? 5 : value < 9 ? 4 : value < 17 ? 3 : value < 25 ? 2 : 1;
                else
                    level =
                        value === 'N/A'
                            ? 11
                            : value === 1
                            ? 10
                            : value > 0.75
                            ? 9
                            : value > 0.5
                            ? 8
                            : value > 0.25
                            ? 7
                            : 6;

                const cellClass = '.chm-cell--heat--level' + level;

                const cellClassIndex = stylesheet.indexOf(cellClass);

                var fill = 'background: #';

                var font = 'color: #';

                // Start at class index, find fill or font and get color substring
                const fontColor = stylesheet
                    .substring(
                        stylesheet.indexOf(font, cellClassIndex) + font.length,
                        stylesheet.indexOf(font, cellClassIndex) + font.length + 7
                    )
                    .replace('#', 'FF');

                const fillColor = stylesheet
                    .substring(
                        stylesheet.indexOf(fill, cellClassIndex) + fill.length,
                        stylesheet.indexOf(fill, cellClassIndex) + fill.length + 7
                    )
                    .replace('#', 'FF');

                console.log(value);
                console.log(chart.typeDict[variable] === 'crfs');
                // Add % format to crf columns
                if (chart.typeDict[variable] === 'crfs') cellStyle.numFmt = '0%';

                cellStyle.font.color.rgb = fontColor;
                cellStyle.fill.fgColor.rgb = fillColor;
            }

            // Use numeric type if it's a number
            const type = typeof value === 'number' ? 'n' : 's';

            addCell(ws, value, type, cellStyle, range, row + 1, col);
        });
    });

    // add headers to filter sheet
    ['Filter', 'Value'].forEach((header, col) => {
        addCell(filter_sheet, header, 'c', clone(headerStyle), range, 0, col);
    });

    // Add filter names and values to filter sheet
    this.filters.forEach((filter, index) => {
        // Add Filter name to Filter column
        addCell(
            filter_sheet,
            this.export.filters[index],
            'c',
            clone(bodyStyle),
            range,
            index + 1,
            0
        );

        // Add Filter value to Value column
        // Handle multiselect
        var filterValue =
            Array.isArray(filter.val) && filter.val.length < filter.choices.length
                ? filter.val.join(', ')
                : Array.isArray(filter.val) && filter.val.length === filter.choices.length
                ? 'All'
                : filter.val;
        addCell(filter_sheet, filterValue, 'c', clone(bodyStyle), range, index + 1, 1);
    });

    ws['!ref'] = XLSX.utils.encode_range(range);
    ws['!cols'] = this.export.cols.map((col, i) => {
        return {
            wpx: value_cols.indexOf(col) > -1 ? 75 : i < this.config.key_cols.length ? 125 : 100
        };
    });
    ws['!autofilter'] = { ref: filterRange };

    filter_sheet['!ref'] = XLSX.utils.encode_range(range);
    filter_sheet['!cols'] = [filter_col_width, filter_col_width];

    wb.Sheets['CRF-Heatmap'] = ws;
    wb.Sheets['Filters'] = filter_sheet;

    this.XLSX = XLSX.write(wb, wbOptions);
}
