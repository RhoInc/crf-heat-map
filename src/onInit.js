import summarizeData from './onInit/summarizeData';

export default function onInit() {
    this.data.initial = this.data.raw;
    this.data.initial_filtered = this.data.initial;

    //Summarize raw data.
    summarizeData.call(this);

    this.data.top = this.data.summarized.filter(d => d.parents.length == 0);

    this.data.raw = this.data.top;

    //Manually set controls' data to raw data.
    this.controls.data = this.data.initial;
    this.controls.ready = true;
}
