export default function syncSettings(settings) {
    settings.cols = d3.merge([['id'], settings.value_cols]);
    return settings;
}
