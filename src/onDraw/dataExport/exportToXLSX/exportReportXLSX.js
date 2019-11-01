import { time } from 'd3';
import FileSaver from './exportXLSX/FileSaver';
import s2ab from './exportXLSX/s2ab';

export default function exportReportXLSX(input) {
    const fileName = `crf-heatmap-report-${time.format('%Y-%m-%dT%H-%M-%S')(new Date())}.xlsx`;
    try {
        const blob = new Blob([s2ab(this.Report)], {
            type: 'application/octet-stream'
        });
        FileSaver(window)(blob, fileName);
    } catch (error) {
        if (typeof console !== 'undefined') console.log(error);
    }
}
