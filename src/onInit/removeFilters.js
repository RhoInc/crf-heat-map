export default function removeFilters() {
    this.controls.config.inputs = this.controls.config.inputs.filter(input => {
        if (input.type !== 'subsetter') {
            return true;
        } else if (!this.data.raw[0].hasOwnProperty(input.value_col)) {
            console.warn(
                `The [ ${input.label} ] filter has been removed because the variable does not exist.`
            );
        } else {
            const levels = d3.set(this.data.raw.map(d => d[input.value_col])).values();

            if (levels.length === 1)
                console.warn(
                    `The [ ${input.label} ] filter has been removed because the variable has only one level.`
                );

            return levels.length > 1;
        }
    });
}
