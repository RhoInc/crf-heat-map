export default function deriveData() {
    //Define headers.
    const headers = d3.merge([
        this.config.id_cols,
        this.filters
            .map(filter => (
                this.controls.config.inputs
                    .find(input => input.value_col === filter.col)
                    .label
            )),
        this.config.headers
    ]);

    //Define columns.
    const id_cols = this.config.id_cols
        .map((id_col,i) => `Nest ${i+1}: ${id_col}`);
    const cols = d3.merge([
            id_cols,
            this.filters.map(filter => filter.col),
            this.config.value_cols
        ]);

    //Define data.
    const data = this.data.filtered.slice();
    data.forEach((d,i) => {
            id_cols.forEach((id_col,j) => {
                const id_val = d.id.split(':')[j];
                d[id_col] = id_val
                    ? j < id_cols.length - 1
                        ? id_val.substring(1)
                        : id_val
                    : 'Total';
            });

            this.filters.forEach(filter => {
                d[filter.col] = filter.val;
            });
        });

    //Define export object.
    this.export = {
        headers,
        cols,
        data
    };
}
