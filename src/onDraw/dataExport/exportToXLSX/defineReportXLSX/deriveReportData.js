import summarizeData from './../../../../onInit/summarizeData';
import { merge, set } from 'd3';

export default function deriveReportData(id) {
    var table = this;

    const summarized = summarizeData.call(this, id, this.data.initial_filtered);

    this.export = {
        nests: id.map(
            (id_col, i) =>
                `Nest ${i + 1}: ${
                    this.initial_config.nestings.find(nesting => nesting.value_col === id_col).label
                }`
        ),
        filters: this.filters.map(
            filter =>
                this.controls.config.inputs.find(input => input.value_col === filter.col).label
        )
    };

    //Define headers.
    this.export.headers = merge([this.export.nests, this.config.headers.slice(1)]);

    //Define columns.
    this.export.cols = merge([this.export.nests, this.config.cols.slice(1)]);

    const subject_id_col_index = id.indexOf(this.config.id_col);
    const subject_id_col = subject_id_col_index > -1;

    //Capture subject-level information.
    if (subject_id_col) {
        //Add headers and columns
        if (this.config.site_col) {
            this.export.headers.push('Site');
            this.export.cols.push('site');
        }

        if (this.config.subject_export_cols) {
            this.config.subject_export_cols.forEach(function(d) {
                table.export.headers.push(d.label);
                table.export.cols.push(d.value_col);
            });
        }

        // build look up for subject
        if (this.config.site_col || this.config.subject_export_cols) {
            var subjects = set(table.data.initial.map(d => d[this.config.id_col])).values();
            var subjectMap = subjects.reduce((acc, cur) => {
                var subjectDatum = this.data.initial.find(d => d[this.config.id_col] === cur);
                acc[cur] = {};
                if (this.config.site_col) acc[cur]['site'] = subjectDatum[this.config.site_col];
                if (this.config.subject_export_cols) {
                    this.config.subject_export_cols.forEach(function(d) {
                        acc[cur][d.value_col] = subjectDatum[d.value_col];
                    });
                }
                return acc;
            }, {});
        }
    }

    // Going to want expanded data - since current data doesn't include child rows unless all are expanded
    this.export.data = summarized.slice();

    // // need to filter rows when expanding in case some input boxes are in use
    if (this.columnControls.filtered) {
        table.export.data = table.export.data.filter(f => !f.filtered || f.visible_child);
    }

    //Add subject-level information
    //save subject label one time for use in join below
    const subject_label = this.initial_config.nestings.find(
        nesting => nesting.value_col === this.config.id_col
    ).label;

    this.export.data.forEach((d, i, thisArray) => {
        //Split ID variable into as many columns as nests currently in place.
        this.export.nests.forEach((id_col, j) => {
            const id_val = d.id.split('  |')[j];
            d[id_col] = id_val || 'Total';
        });

        // // Now "join" subject level information to export data
        if ((this.config.site_col || this.config.subject_export_cols) && subject_id_col) {
            const subjectID = d[`Nest ${subject_id_col_index + 1}: ${subject_label}`];
            Object.assign(d, subjectMap[subjectID]);
        }
    });

    //Remove total rows.
    this.export.data = this.export.data.filter(
        d => !this.export.nests.some(nest => d[nest] === 'Total')
    );
}
