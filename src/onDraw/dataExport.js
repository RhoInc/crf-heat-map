import deriveData from './dataExport/deriveData';
import csv from './dataExport/csv';
import exportToXLSX from './dataExport/exportToXLSX';
import exportReportToXLSX from './dataExport/exportReportToXLSX';

export default function dataExport() {
    //Export to .csv.
    if (this.config.exports.find(export_ => export_ === 'csv')) {
        this.wrap.select('.export#csv').on('click', () => {
            deriveData.call(this);
            csv.call(this);
        });
    }

    //Export to .xlsx.
    if (this.config.exports.find(export_ => export_ === 'xlsx')) {
        this.wrap.select('.export#xlsx').on('click', () => {
            deriveData.call(this);
            exportToXLSX.call(this);
        });
    }

  this.wrap.select('.export#report').on('click', () => {
      exportReportToXLSX.call(this)
})

}
