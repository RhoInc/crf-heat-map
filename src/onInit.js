import summarizeData from './onInit/summarizeData';
import removeFilters from './onInit/removeFilters';


export default function onInit() {
    this.data.initial = this.data.raw;
    this.data.initial_filtered = this.data.initial;

    //remove single-level or dataless filters
    removeFilters.call(this)

    //Summarize raw data.
    summarizeData.call(this);

    this.data.top = this.data.summarized.filter(d => d.parents.length == 0);

    this.data.raw = this.data.top;

    //Manually set controls' data to raw data.
    this.controls.data = this.data.initial;
    this.controls.ready = true;
}
