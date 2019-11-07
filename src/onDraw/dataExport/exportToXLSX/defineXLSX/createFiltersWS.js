import headerStyle from '../defineXLSX/headerStyle';
import bodyStyle from '../defineXLSX/bodyStyle';
import workBook from '../defineXLSX/workBook';
import addCell from '../defineXLSX/addCell';
import clone from '../../../../util/clone';

//Generate Filters sheet for Report
export default function createFiltersWS() {
    const filter_sheet = {}; //sheet for filter values
    const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    const filter_col_width = { wpx: 125 };

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

    filter_sheet['!ref'] = XLSX.utils.encode_range(range);
    filter_sheet['!cols'] = [filter_col_width, filter_col_width];

    return filter_sheet;
}
