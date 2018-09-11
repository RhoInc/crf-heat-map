import controlInputs from './controlInputs';

export default function syncControlInputs(settings) {
    const defaultControls = controlInputs();
    const labels = {};
    labels[settings.site_col] = 'Site';
    labels[settings.id_freeze_col] = 'Subject Freeze Status';
    labels[settings.id_status_col] = 'Subject Status';
    settings.filter_cols.forEach((filter_col, i) => {
        const filter = {
            type: 'subsetter',
            value_col: filter_col,
            label: labels[filter_col]
                ? labels[filter_col]
                : /^subset\d$/.test(filter_col)
                    ? filter_col.replace(/^s/, 'S').replace(/(\d)/, ' $1')
                    : filter_col.label || filter_col.value_col || filter_col
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
