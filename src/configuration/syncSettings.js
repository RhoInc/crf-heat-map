export default function syncSettings(settings) {
    settings.id_cols = settings.nestings
        .filter(d => d.default_nesting === true)
        .map(f => f.value_col)
        .slice(0, 3);
    settings.cols = d3.merge([['id'], settings.value_cols]);

    return settings;
}
