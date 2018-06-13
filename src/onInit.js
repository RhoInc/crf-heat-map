import flattenData from './onInit/flattenData';

export default function onInit() {
    this.data.initial = this.data.raw;
    flattenData.call(this);
}
