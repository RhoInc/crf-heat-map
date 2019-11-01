import customizeFilters from './onLayout/customizeFilters';
import tweakMultiSelects from './onLayout/tweakMultiSelects';
import customizeCheckboxes from './onLayout/customizeCheckboxes';
//import moveExportButtons from './onLayout/moveExportButtons';
import addColumnControls from './onLayout/addColumnControls';
import formatControls from './onLayout/formatControls';
import addReportExport from './onLayout/addReportExport';

export default function onLayout() {
    customizeFilters.call(this);
    tweakMultiSelects.call(this);
    customizeCheckboxes.call(this);
    //moveExportButtons.call(this);
    addColumnControls.call(this);
    formatControls.call(this);
    addReportExport.call(this);
    console.log(this);
}
