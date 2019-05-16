export default function customizeNestSelects(idSelects) {
    var first_nest = idSelects[0][0],
        second_nest = idSelects[0][1],
        third_nest = idSelects[0][2];

    //case 1: Set second nest to None if its value is selected in the first nest and no third nest is present
    if (first_nest.value == second_nest.value && this.table.config.id_cols.length == 2) {
        second_nest.value = 'None';
    }

    // case 2: Set second nest to the third nest's value if its value is selected in the first nest. Set third nest to none.
    if (first_nest.value == second_nest.value && this.table.config.id_cols.length == 3) {
        second_nest.value = third_nest.value;
        third_nest.value = 'None';
    }

    // case 3: If third nests value is selected for first nest or second nest, set third nest to None
    if (first_nest.value == third_nest.value || second_nest.value == third_nest.value) {
        third_nest.value = 'None';
    }
}
