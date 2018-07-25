import summarizeData from '../../onInit/summarizeData';
import resetFilters from '../addColumnControls/addResetButton/resetFilters';

export default function redraw() {
    summarizeData.call(this);
    resetFilters.call(this);
    this.draw(this.data.summarized);
}
