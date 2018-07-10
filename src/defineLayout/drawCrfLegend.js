import addTitle from './drawLegend/addTitle';
import drawRects from './drawLegend/drawRects';

export default function drawCrfLegend() {
    const crfData = [
        {
            label: '0-25%',
            color: '#eff3ff'
        },
        {
            label: '25-50%',
            color: '#bdd7e7'
        },
        {
            label: '50-75%',
            color: '#6baed6'
        },
        {
            label: '75-99%',
            color: '#3182bd'
        },
        {
            label: '100%',
            color: '#08519c'
        }
    ];
    addTitle(this.containers.crfLegend, 'CRFs');
    drawRects(this.containers.crfLegend, crfData);
}
