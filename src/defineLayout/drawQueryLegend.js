import addTitle from './drawLegend/addTitle';
import drawRects from './drawLegend/drawRects';

export default function drawQueryLegend() {
    const queryData = [
        {
            label: '>24',
            color: '#edf8e9'
        },
        {
            label: '17-24',
            color: '#bae4b3'
        },
        {
            label: '9-16',
            color: '#74c476'
        },
        {
            label: '1-8',
            color: '#31a354'
        },
        {
            label: '0',
            color: '#006d2c'
        }
    ];
    addTitle(this.containers.queryLegend, 'Queries');
    drawRects(this.containers.queryLegend, queryData);
}
