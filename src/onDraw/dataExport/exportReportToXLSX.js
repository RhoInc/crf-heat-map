import defineReportXLSX from './exportToXLSX/defineReportXLSX';
import exportReportXLSX from './exportToXLSX/exportReportXLSX';

export default function exportReportToXLSX() {

  defineReportXLSX.call(this);
  exportReportXLSX.call(this);

}
