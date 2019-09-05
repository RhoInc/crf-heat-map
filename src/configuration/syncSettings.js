export default function syncSettings(settings) {
    // sort value_cols so that crfs come before query cols regardless of order in rendererSettings
    settings.value_cols.sort(function(a, b) {
        return a.type < b.type ? -1 : a.type > b.type ? 1 : 0;
    });

    // catch user providing too many nesting columns
    if (settings.default_nesting.length > 3) {
        throw 'More than three default nesting columns were provided [' +
            settings.default_nesting.join(', ') +
            ']. Only three variables can be nested at a time. Please reduce the number of variables in the default_nesting setting.';
    }

    //Define initial nesting variables.
    settings.key_cols = [];
    settings.default_nesting.forEach(function(d) {
        settings.key_cols.push(settings[d]);
    });

    settings.nestings = [
        {
            settings_col: 'site_col',
            label: 'Site'
        },
        {
            settings_col: 'id_col',
            label: 'Subject ID'
        },
        {
            settings_col: 'visit_col',
            label: 'Folder'
        },
        {
            settings_col: 'form_col',
            label: 'Form'
        }
    ];

    settings.nestings.forEach(function(d) {
        d.value_col = settings[d.settings_col];
    });

    //Define table column variables.
    settings.cols = d3.merge([['id'], settings.value_cols.map(d => d.col)]);

    // Define nesting filters
    var nest_settings = [];
    if (settings.nesting_filters === true) {
        settings.nestings.forEach(setting =>
            nest_settings.push({
                value_col: setting.value_col,
                label: setting.label
            })
        );
    }

    //Define filter variables.
    settings.filter_cols = Array.isArray(settings.filter_cols)
        ? nest_settings.concat(settings.filter_cols)
        : nest_settings;

    //Define cols to include in subject level export
    settings.subject_export_cols = settings.filter_cols.filter(
        filter => filter.subject_export == true
    );

    // add labels specified in rendererSettings as headers
    settings.headers = settings.value_cols.map(d => d.label);

    // throw an error if there are more than 8 columns (due to current css set up)
    if (settings.headers.length > 8) {
        throw "A maximum of eight statistic columns is allowed. There are more than 8 value_col entries in rendererSettings currently. Don't be so greedy.";
    }

    //add ID header
    settings.headers.unshift('ID');

    return settings;
}
