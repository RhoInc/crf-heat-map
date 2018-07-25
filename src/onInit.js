import summarizeData from './onInit/summarizeData';

export default function onInit() {
    this.data.initial = this.data.raw;
    this.data.initial_filtered = this.data.initial;

    //Summarize raw data.
    summarizeData.call(this);

    //Manually set controls' data to raw data.
    this.controls.data = this.data.initial;
    this.controls.ready = true;
}
