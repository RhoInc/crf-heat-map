import summarizeData from '../../onInit/summarizeData';
import resetFilters from '../addColumnControls/addResetButton/resetFilters';

export default function redraw() {
    this.data.summarized = summarizeData.call(this);
    this.data.top = this.data.summarized.filter(d => d.parents.length == 0);
    this.data.raw = this.data.top;
    resetFilters.call(this);
    this.draw(this.data.raw);
}
