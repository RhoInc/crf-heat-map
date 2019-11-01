import addResetButton from './addColumnControls/addResetButton';
import addSliders from './addColumnControls/addColumnFilters';
import { max } from 'd3';

export default function addColumnControls() {
    const context = this;

    //Define custom column controls object.
    this.columnControls = {
        header: this.thead.append('tr').attr('id', 'column-controls'),
        filters: this.config.cols
            .filter(d => d !== 'id')
            .map(variable => {
                const filter = {
                    variable: variable,
                    min: 0,
                    lower: 0,
                    max:
                        context.typeDict[variable] == 'crfs'
                            ? 1
                            : max(this.data.raw, di => di[variable + '_value'])
                };
                filter.upper = filter.max;

                return filter;
            })
    };

    //Add cells to header.
    this.columnControls.cells = this.columnControls.header
        .selectAll('th')
        .data(this.config.cols)
        .enter()
        .append('th')
        .each(function(d) {
            if (d === 'id') addResetButton.call(context, this);
            else addSliders.call(context, this, d);
        });
}
