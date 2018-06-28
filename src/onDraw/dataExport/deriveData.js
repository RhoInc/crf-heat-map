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
                subject['site'] = subjectmap[subject['Nest 1: subjectnameoridentifier']]['site'];
                subject['status'] =
                    subjectmap[subject['Nest 1: subjectnameoridentifier']]['status'];
                subject['freeze'] =
                    subjectmap[subject['Nest 1: subjectnameoridentifier']]['freeze'];
            });
        }

        // case 2: Subject is lowest of two nests
        else if (table.config.id_cols.length == 2) {
            this.export.data.forEach(function(levelTwo, index, object) {
                levelTwo['Nest 2: subjectnameoridentifier'] === 'Total' // remove Total rows
                    ? object.splice(index, 1)
                    : null;
                if (typeof levelTwo.children != 'undefined') {
                    levelTwo.children[0].forEach(function(d) {
                        d.__data__['site'] =
                            subjectmap[d.__data__['Nest 2: subjectnameoridentifier']]['site'];
                        d.__data__['status'] =
                            subjectmap[d.__data__['Nest 2: subjectnameoridentifier']]['status'];
                        d.__data__['freeze'] =
                            subjectmap[d.__data__['Nest 2: subjectnameoridentifier']]['freeze'];
                    });
                }
            });
        }

        // case 3: Subject is lowest of three nests
        else if (table.config.id_cols.length == 3) {
            this.export.data.forEach(function(levelThree, index, object) {
                levelThree['Nest 3: subjectnameoridentifier'] === 'Total' // remove Total rows
                    ? object.splice(index, 1)
                    : null;
                Object.values(levelThree)[Object.values(levelThree).length - 2] === 'Total' // want to remove totals from nest 2 too
                    ? object.splice(index, 1)
                    : null;
                if (typeof levelThree.children != 'undefined') {
                    levelThree.children[0].forEach(function(levelTwo) {
                        if (typeof levelTwo.__data__.children != 'undefined') {
                            levelTwo.__data__.children[0].forEach(function(d) {
                                d.__data__['site'] =
                                    subjectmap[d.__data__['Nest 3: subjectnameoridentifier']][
                                        'site'
                                    ];
                                d.__data__['status'] =
                                    subjectmap[d.__data__['Nest 3: subjectnameoridentifier']][
                                        'status'
                                    ];
                                d.__data__['freeze'] =
                                    subjectmap[d.__data__['Nest 3: subjectnameoridentifier']][
                                        'freeze'
                                    ];
                            });
                        }
                    });
                }
            });
        }
    }
}
