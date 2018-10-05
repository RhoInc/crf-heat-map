export default function syncSettings(settings) {
    //Sync nestings with data variable settings.
    const settingsKeys = Object.keys(settings);
    const settingsCols = settingsKeys.filter(settingsKey => /_col$/.test(settingsKey));
    settings.nestings.forEach(nesting => {
        nesting.value_col =
            nesting.value_col ||
            settings[settingsCols.find(settingsCol => settingsCol === nesting.settings_col)];
    });

    //Define initial nesting variables.
    settings.id_cols = settings.nestings
        .filter(d => d.default_nesting === true)
        .map(f => f.value_col)
        .slice(0, 3);

    //Define table column variables.
    settings.cols = d3.merge([['id'], settings.value_cols]);

    //Define filter variables.
    settings.filter_cols = Array.isArray(settings.filter_cols)
        ? [settings.site_col, settings.id_freeze_col, settings.id_status_col].concat(
              settings.filter_cols
          )
        : [settings.site_col, settings.id_freeze_col, settings.id_status_col];

    return settings;
}
