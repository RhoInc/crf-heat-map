import headerStyle from './defineXLSX/headerStyle';
import bodyStyle from './defineXLSX/bodyStyle';
import workBook from './defineXLSX/workBook';
import addCell from './defineXLSX/addCell';
import clone from '../../../util/clone';

export default function defineXLSX() {

     const value_cols = this.config.value_cols.map(d => d.col);
    const wb = new workBook();
    console.log(wb)
    console.log(wb)
    const ws = {};
    const cols = [];
    const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    const wbOptions = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    };

const chart = this;

    const filterRange =
        'A1:' + String.fromCharCode(64 + this.export.cols.length) + (this.export.data.length + 1);

    // Header row
    this.export.headers.forEach((header, col) => {
        addCell(wb, ws, header, 'c', clone(headerStyle), range, 0, col);
    });

    // Data rows
      const stylesheet = crfHeatMap().style.textContent;
    this.export.data.forEach((d, row) => {
        this.export.cols.forEach((variable, col) => {

            const value = d[variable];
            const cellStyle = clone(bodyStyle);

          if (value_cols.indexOf(variable) > -1){ // amke this small fucntion
            var level;
            if (chart.typeDict[variable] == 'queries')
                level =
                    value === 0 ? 5 : value < 9 ? 4 : value < 17 ? 3 : value < 25 ? 2 : 1;
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

            var cellClass = '.chm-cell--heat--level' + level;

            var cellClassIndex =   stylesheet.indexOf(cellClass)

            var fill = "background: #"

            var font = "color: #"

            const fontColor = stylesheet.substring(stylesheet.indexOf (font,  cellClassIndex) +
            font.length,stylesheet.indexOf (font,  cellClassIndex) +
            font.length+ 7).replace('#', 'FF');

            const fillColor =  stylesheet.substring(stylesheet.indexOf (fill,  cellClassIndex) +
            fill.length,stylesheet.indexOf (fill,  cellClassIndex) +
            fill.length+ 7).replace('#', 'FF');


            if (chart.typeDict[variable] === "crfs") cellStyle.numFmt = "0%"

            cellStyle.font.color.rgb = fontColor;
            cellStyle.fill.fgColor.rgb = fillColor;


}

            var type  = typeof value === 'number' ? "n" : "s"

            addCell(wb, ws, value, type , cellStyle, range, row + 1, col);

        });
    });
const filter_sheet = {};
    // add filters tab
    [['Filter', 'Value']].forEach((header, col) => {
        addCell(wb, filter_sheet, header, 'c', clone(headerStyle), range, 0, col);
    });
    // //Write current filters to second sheet.
    //     workbook.Sheets['Current Filters'] = XLSX.utils.aoa_to_sheet(
    //         [['Filter', 'Value']].concat(
    //             this.filters.map(filter => {
    //                 return [
    //                     filter.col,
    //                     Array.isArray(filter.val) && filter.val.length < filter.choices.length
    //                         ? filter.val.join(', ')
    //                         : Array.isArray(filter.val) && filter.val.length === filter.choices.length
    //                             ? 'All'
    //                             : filter.val
    //                 ];
    //             })
    //         )
    //     );


console.log(wb)
    ws['!ref'] = XLSX.utils.encode_range(range);
    ws['!cols'] = this.export.cols.map((col, i) => {
        return {
            wpx: value_cols.indexOf(col) > -1 ? 75 : i < this.config.key_cols.length ? 125 : 100
        };
    });




    ws['!autofilter'] = { ref: filterRange };
    // ws['!freeze'] = { xSplit: '1', ySplit: '1', topLeftCell: 'B2', activePane: 'bottomRight', state: 'frozen' };
console.log(this.export.data)
    wb.Sheets['CRF-heatmap'] = ws;
    wb.Sheets['filters'] = filter_sheet;

    this.XLSX = XLSX.write(wb, wbOptions);
}
