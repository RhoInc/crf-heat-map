export default function checkRequiredVariables() {
    const requiredVariables = d3
        .set(
            d3.merge([
                this.settings.synced.nestings.map(
                    nesting => `${nesting.value_col} (${nesting.label})`
                ),
                this.settings.synced.value_cols.map(d => d.col),
                this.settings.synced.filter_cols
            ])
        )
        .values();
    const missingVariables = requiredVariables.filter(
        variable => this.data.variables.indexOf(variable.split(' (')[0]) < 0
    );
    if (missingVariables.length)
        alert(
            `The data are missing ${
                missingVariables.length === 1 ? 'this variable' : 'these variables'
            }: ${missingVariables.join(', ')}.`
        );
}
