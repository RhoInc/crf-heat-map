import { set } from 'd3';

export default function removeSubjectExportCols() {
  const context = this;
  var export_cols = this.initial_config.subject_export_cols.map(d => d.value_col)

  if (export_cols.length > 0) {
      var subjectSetSize = set(this.data.initial.map(d => d.subjectnameoridentifier)).size()

      export_cols.forEach(function(col) {
          if (set(context.data.initial.map(d => d[context.initial_config.id_col] + d[col])).size()  !== subjectSetSize ) {
            console.warn(`${col} was removed from the subject level export due to multiple values within subject.`)
            context.initial_config.subject_export_cols.splice(
              context.initial_config.subject_export_cols.findIndex(d => d.value_col === col),1
            );
          }
      })
  }
}
