import defineXLSX from './exportToXLSX/defineXLSX';
import exportXLSX from './exportToXLSX/exportXLSX';

export default function exportToXLSX() {

    defineXLSX.call(this);
    exportXLSX.call(this);
}
