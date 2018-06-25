export default function syncSettings(settings) {
    settings.id_cols = settings.nestings.filter(d => d.default === true).map(f => f.value_col);
    settings.cols = d3.merge([['id'], settings.value_cols]);
    return settings;
}
