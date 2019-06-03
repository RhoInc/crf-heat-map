export default function checkRequiredVariables() {
    const requiredVariables = d3
        .set(
            d3.merge([
                this.settings.synced.nestings.map(
                    nesting => `${nesting.value_col} (${nesting.label})`
                ),
                this.settings.synced.value_cols.map(d => d.col),
                this.settings.synced.filter_cols.map(filter => filter.value_col)
            ])
        )
        .values();

    const missingVariables = requiredVariables.filter(
        variable => this.data.variables.indexOf(variable.split(' (')[0]) < 0
    );
    if (missingVariables.length)
        console.log(
            `The data are missing ${
                missingVariables.length === 1 ? 'this variable' : 'these variables'
            }: ${missingVariables.join(', ')}.`
        );
}
