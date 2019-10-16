export default function sortRows(data_summarized, key_cols) {
    const context = this;

    //Collapse array of arrays to array of objects.
    const data_sorted = d3.merge(data_summarized).sort(function(a, b) {
        const formIndex = key_cols.indexOf(context.initial_config.form_col);
        const visitIndex = key_cols.indexOf(context.initial_config.visit_col);

        if (formIndex > -1 || visitIndex > -1) {
            var aIds = a.id.split('  |');
            var bIds = b.id.split('  |');
            var i;
            for (i = 0; i < key_cols.length; i++) {
                if (aIds[i] === bIds[i]) {
                    continue;
                } else {
                    // use form_order_col if provided
                    if (i === formIndex && context.initial_config.form_order_col) {
                        return typeof aIds[i] == 'undefined'
                            ? -1
                            : parseFloat(a.form_order) < parseFloat(b.form_order)
                            ? -1
                            : 1;
                        // use visit_order_col if provided
                    }
                    if (i === visitIndex && context.initial_config.visit_order_col) {
                        return typeof aIds[i] == 'undefined'
                            ? -1
                            : parseFloat(a.visit_order) < parseFloat(b.visit_order)
                            ? -1
                            : 1;
                    } else {
                        return typeof aIds[i] === 'undefined' ? -1 : aIds[i] < bIds[i] ? -1 : 1;
                    }
                }
            }
        } else {
            return a.id < b.id ? -1 : 1;
        }
    });
    return data_sorted
}
