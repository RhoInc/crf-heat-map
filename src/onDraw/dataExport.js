import deriveData from './dataExport/deriveData';
import csv from './dataExport/csv';
import xlsx from './dataExport/xlsx';

export default function dataExport() {
    //Export to .csv.
    if (this.config.exports.find(export_ => export_ === 'csv')) {
        deriveData.call(this);
        this.wrap.select('.export#csv').on('click', () => {
            csv.call(this);
        });
    }

    //Export to .xlsx.
    if (this.config.exports.find(export_ => export_ === 'xlsx')) {
        deriveData.call(this);
        this.wrap.select('.export#xlsx').on('click', () => {
            xlsx.call(this);
        });
    }
}
