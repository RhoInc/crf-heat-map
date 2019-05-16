export default function sortRows() {
    const context = this;

    //Collapse array of arrays to array of objects.
    this.data.summarized = d3.merge(this.data.summaries).sort(function(a, b) {
        const formIndex = context.config.id_cols.indexOf(context.initial_config.form_col);
        const visitIndex = context.config.id_cols.indexOf(context.initial_config.visit_col);

        if (formIndex > -1 || visitIndex > -1) {
            var aIds = a.id.split('  |');
            var bIds = b.id.split('  |');
            var i;
            for (i = 0; i < context.config.id_cols.length; i++) {
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
}
