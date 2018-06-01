import clone from '../util/clone';

export default function applyFilters() {
    //If there are filters, return a filtered data array of the raw data.
    //Otherwise return the raw data.

// add filters from filterable
    this.filterable.filters.forEach(filter => {
      this.filters.push({
          col: filter.col,
          val: filter.level
});
});

console.log(this.filters) //these are wrong!!

    this.data.filtered_ = this.filters //need to make this unique for the if in flattenData
        ? clone(this.data.initial).filter(d => {
              let match = true;
              this.filters.forEach(filter => {
                  if (match === true && filter.val !== 'All')
                      match =
                          filter.val instanceof Array
                              ? filter.val.indexOf(d[filter.col]) > -1
                              : filter.val === d[filter.col];
              });
              return match;
          })
        : clone(this.data.initial);


}
