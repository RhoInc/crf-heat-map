import deriveData from './dataExport/deriveData';
import csv from './dataExport/csv';
import xlsx from './dataExport/xlsx';

export default function dataExport() {
    deriveData.call(this);

    //Export to .csv.
    if (this.config.exports.find(export_ => export_ === 'csv'))
        csv.call(this);

    //Export to .xlsx.
    if (this.config.exports.find(export_ => export_ === 'xlsx'))
        xlsx.call(this);
}
