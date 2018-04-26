import flattenData from './flattenData';

export default function onInit() {
    this.data.initial = this.data.raw;
    this.data.raw = flattenData.call(this);
}
