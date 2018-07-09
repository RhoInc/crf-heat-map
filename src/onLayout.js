import customizeFilters from './onLayout/customizeFilters';
import customizeCheckboxes from './onLayout/customizeCheckboxes';
import moveExportButtons from './onLayout/moveExportButtons';
import addColumnControls from './onLayout/addColumnControls';

export default function onLayout() {
    customizeFilters.call(this);
    customizeCheckboxes.call(this);
    //moveExportButtons.call(this);
    addColumnControls.call(this);
}
