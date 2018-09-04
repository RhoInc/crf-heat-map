export default function deriveData() {
    var table = this;
    this.export = {
        nests: this.config.id_cols.map((id_col, i) => `Nest ${i + 1}: ${id_col}`),
        filters: this.filters.map(
            filter =>
                this.controls.config.inputs.find(input => input.value_col === filter.col).label
        )
    };

    //Define headers.
    this.export.headers = d3.merge([this.export.nests, this.config.headers.slice(1)]);

    //Define columns.
    this.export.cols = d3.merge([this.export.nests, this.config.cols.slice(1)]);

    const subject_id_col_index = this.config.id_cols.indexOf('subjectnameoridentifier');
    const subject_id_col = subject_id_col_index > -1;

    //Capture subject-level information.
    if (subject_id_col) {
        //Add headers.
        this.export.headers.push('Site', 'Subject Status', 'Subject Freeze Status');

        //Add columns.
        this.export.cols.push('site', 'status', 'freeze');

        // build look up for subject
        var subjects = d3.set(table.data.initial.map(d => d['subjectnameoridentifier'])).values();
        var subjectMap = subjects.reduce((acc, cur) => {
            var subjectDatum = this.data.initial.find(d => d['subjectnameoridentifier'] === cur);
            acc[cur] = {
                site: subjectDatum.sitename,
                status: subjectDatum.status,
                freeze: subjectDatum.subjfreezeflg
            };
            return acc;
        }, {});
    }

    //Define data.
    this.export.data = this.data.filtered.slice();
    this.export.data.forEach((d, i, thisArray) => {
        //Split ID variable into as many columns as nests currently in place.
        this.export.nests.forEach((id_col, j) => {
            const id_val = d.id.split('  |')[j];
            d[id_col] = id_val || 'Total';
        });

        // Now "join" subject level information to export data
        if (subject_id_col) {
            const subjectID = d[`Nest ${subject_id_col_index + 1}: subjectnameoridentifier`];
            Object.assign(d, subjectMap[subjectID]);
        }
    });

    //Remove total rows.
    this.export.data = this.export.data.filter(
        d => !this.export.nests.some(nest => d[nest] === 'Total')
    );
}
