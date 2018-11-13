import summarizeData from '../../onInit/summarizeData';
import resetFilters from '../addColumnControls/addResetButton/resetFilters';

export default function redraw() {
    summarizeData.call(this);
    this.data.raw = this.data.summarized.filter(d => d.parents.length == 0);
    resetFilters.call(this);
    this.draw(this.data.raw);
}
