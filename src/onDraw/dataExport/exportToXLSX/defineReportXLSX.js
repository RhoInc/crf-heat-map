import reportWorkBook from './defineReportXLSX/reportWorkBook';
import clone from '../../../util/clone';
import deriveReportData from './defineReportXLSX/deriveReportData';
import createWS from './defineReportXLSX/createWS';
import createFiltersWS from './defineReportXLSX/createFiltersWS';

export default function defineReportXLSX() {
    var nesting_vars = this.initial_config.nestings.map(d => d.value_col);
    var nesting_labels = this.initial_config.nestings.map(d => d.label);
    const context = this;
    const wb = new reportWorkBook(nesting_labels);
    const wbOptions = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    };

    nesting_vars.forEach(function(nesting_var, i) {
        var ids = [nesting_var];

        // add nests
        var j;
        for (j = 0; j < i; j++) {
            ids.unshift(nesting_vars[i - j - 1]);
        }

        deriveReportData.call(context, ids);

        var ws = createWS.call(context);

        wb.Sheets[nesting_labels[i]] = ws;
    });

    wb.Sheets['Filters'] = createFiltersWS.call(this);
    this.Report = XLSX.write(wb, wbOptions);
}
