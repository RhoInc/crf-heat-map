import headerStyle from '../defineXLSX/headerStyle';
import bodyStyle from '../defineXLSX/bodyStyle';
import addCell from '../defineXLSX/addCell';
import clone from '../../../../util/clone';

//Generate WS for Report
export default function createWS(id) {
    const chart = this;
    const value_cols = this.config.value_cols.map(d => d.col);
    const ws = {}; //sheet for heatmao
    const cols = [];
    const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };

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
            const value = d[variable];
            const cellStyle = clone(bodyStyle);

            if (value_cols.indexOf(variable) > -1) {
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

    ws['!ref'] = XLSX.utils.encode_range(range);
    ws['!cols'] = this.export.cols.map((col, i) => {
        return {
            wpx: value_cols.indexOf(col) > -1 ? 75 : i == 1 ? 125 : 100
        };
    });
    ws['!autofilter'] = { ref: filterRange };
    return ws;
}
