import checkRequiredVariables from './init/checkRequiredVariables';

export default function init(data) {
    this.data = {
        raw: data,
        variables: Object.keys(data[0])
    };
    checkRequiredVariables.call(this);
    this.table.init(data);
}
