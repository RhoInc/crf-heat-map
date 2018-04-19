import createNestControl from './onLayout/createNestControl';
import drawLegend from './onLayout/drawLegend';

export default function onLayout() {
    createNestControl.call(this);
    drawLegend.call(this);
}
