import controlInputs from './controlInputs';

export default function syncControlInputs(settings) {
    const defaultControls = controlInputs();
    settings.filter_cols.forEach((filter_col, i) => {
        const filter = {
            type: 'subsetter',
            value_col: filter_col.value_col,
            label: filter_col.label
                ? filter_col.label
                : filter_col.value_col,
            multiple: filter_col.multiple ? filter_col.multiple : false
        };
        defaultControls.splice(i, 0, filter);
    });

    if (Array.isArray(settings.filters) && settings.filters.length > 0) {
        const otherFilters = settings.filters.map(filter => {
            const filterObject = {
                type: 'subsetter',
                value_col: filter.value_col || filter,
                label: filter.label || filter.value_col || filter
            };
            return filterObject;
        });

        return defaultControls.concat(otherFilters);
    } else return defaultControls;
}
