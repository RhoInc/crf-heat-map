import customizeFilters from './onLayout/customizeFilters';
import createNestControl from './onLayout/createNestControl';
import drawLegend from './onLayout/drawLegend';
import addColumnControls from './onLayout/addColumnControls';

export default function onLayout() {
    customizeFilters.call(this);
    createNestControl.call(this);
    drawLegend.call(this);
    var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g); //check if browser is IE
    if (!isIE) {
        addColumnControls.call(this);
    }
}
