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

    //Define data.
    this.export.data = this.data.filtered.slice();
    this.export.data.forEach((d, i) => {
        //Split ID variable into as many columns as nests currently in place.
        this.export.nests.forEach((id_col, j) => {
            const id_val = d.id.split('|')[j];
            d[id_col] = id_val || 'Total';
        });
    });

    //conditionally add subject level data if subjectID is the lowest id level
    if (table.config.id_cols[table.config.id_cols.length - 1] === 'subjectnameoridentifier') {
        //Add headers.
        this.export.headers.push('Site', 'Subject Status', 'Freeze Status');

        //Add columns.
        this.export.cols.push('site', 'status', 'freeze');

        // build look up for subject
        var subjectmap = {};
        table.data.initial.forEach(function(row) {
            subjectmap[row.subjectnameoridentifier] = {
                site: row['sitename'],
                status: row['status'],
                freeze: row['SubjFreezeFlg']
            };
        });

        // Now "join" subject level information to export data

        // case 1: Subject is only nest
        if (table.config.id_cols.length == 1) {
            this.export.data.forEach(function(subject, index, objects) {
                subject['site'] =
                    subjectmap[Object.values(subject)[Object.values(subject).length - 1]]['site'];
                subject['status'] =
                    subjectmap[Object.values(subject)[Object.values(subject).length - 2]]['status']; // have to move to -2 to get subject since site was added to array
                subject['freeze'] =
                    subjectmap[Object.values(subject)[Object.values(subject).length - 3]]['freeze'];
            });
        }

        // case 2: Subject is lowest of two nests
        else if (table.config.id_cols.length == 2) {
            this.export.data.forEach(function(levelTwo, index, object) {
                Object.values(levelTwo)[Object.values(levelTwo).length - 1] === 'Total'
                    ? object.splice(index, 1)
                    : null; // remove Total rows
                if (typeof levelTwo.children != 'undefined') {
                    levelTwo.children[0].forEach(function(d) {
                        d.__data__['site'] =
                            subjectmap[
                                Object.values(d.__data__)[Object.values(d.__data__).length - 1]
                            ]['site'];
                        d.__data__['status'] =
                            subjectmap[
                                Object.values(d.__data__)[Object.values(d.__data__).length - 2]
                            ]['status'];
                        d.__data__['freeze'] =
                            subjectmap[
                                Object.values(d.__data__)[Object.values(d.__data__).length - 3]
                            ]['freeze'];
                    });
                }
            });
        }

        // case 3: Subject is lowest of three nests
        else if (table.config.id_cols.length == 3) {
            this.export.data.forEach(function(levelThree, index, object) {
                Object.values(levelThree)[Object.values(levelThree).length - 1] === 'Total'
                    ? object.splice(index, 1)
                    : null; // remove Total rows
                Object.values(levelThree)[Object.values(levelThree).length - 2] === 'Total'
                    ? object.splice(index, 1)
                    : null; // remove Total rows
                if (typeof levelThree.children != 'undefined') {
                    levelThree.children[0].forEach(function(levelTwo) {
                        if (typeof levelTwo.__data__.children != 'undefined') {
                            levelTwo.__data__.children[0].forEach(function(d) {
                                d.__data__['site'] =
                                    subjectmap[
                                        Object.values(d.__data__)[
                                            Object.values(d.__data__).length - 1
                                        ]
                                    ]['site'];
                                d.__data__['status'] =
                                    subjectmap[
                                        Object.values(d.__data__)[
                                            Object.values(d.__data__).length - 2
                                        ]
                                    ]['status'];
                                d.__data__['freeze'] =
                                    subjectmap[
                                        Object.values(d.__data__)[
                                            Object.values(d.__data__).length - 3
                                        ]
                                    ]['freeze'];
                            });
                        }
                    });
                }
            });
        }
    }
}
