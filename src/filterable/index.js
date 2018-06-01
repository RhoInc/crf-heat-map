import layout from './layout';
import onClick from './onClick';
import filterData from './filterData';

export default function filterable() {
    return {
        layout: layout,
        onClick: onClick,
        filterData: filterData,
        filters: []
    };
}
