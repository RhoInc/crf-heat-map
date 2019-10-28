import reportWorkBook from './defineReportXLSX/reportWorkBook';
import clone from '../../../util/clone';
import deriveReportData from './defineReportXLSX/deriveReportData';
import createWS from './defineReportXLSX/createWS';

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

    nesting_vars.forEach(function(d, i) {
        deriveReportData.call(context, [d]);

        var ws = createWS.call(context);

        wb.Sheets[nesting_labels[i]] = ws;
    });

    this.Report = XLSX.write(wb, wbOptions);
}
