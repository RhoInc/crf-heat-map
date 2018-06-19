import customizeFilters from './onLayout/customizeFilters';
import createNestControl from './onLayout/createNestControl';
import drawLegend from './onLayout/drawLegend';
import addColumnControls from './onLayout/addColumnControls';

export default function onLayout() {
    customizeFilters.call(this);
    createNestControl.call(this);
    drawLegend.call(this);
    addColumnControls.call(this);
}
