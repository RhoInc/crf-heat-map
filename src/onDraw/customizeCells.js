export default function customizeCells() {
    this.cells = this.tbody.selectAll('td');
    this.cells
        .attr('class', d => {
            let cellClass = 'cell';

            if (d.col === 'id')
                cellClass = cellClass + ' cell--id' + ' cell--id--level' + d.text.substring(0, 1);
            else {
                cellClass = cellClass + ' cell--heat';
                let level;
                if (d.col.indexOf('query') > -1)
                    level =
                        d.text === 0 ? 5 : d.text < 9 ? 4 : d.text < 17 ? 3 : d.text < 25 ? 2 : 1;
                else
                    level =
                        d.text === 1
                            ? 5
                            : d.text > 0.75
                                ? 4
                                : d.text > 0.5
                                    ? 3
                                    : d.text > 0.25
                                        ? 2
                                        : 1;
                cellClass = cellClass + ' cell--heat--level' + level;
            }

            return cellClass;
        })
        .text(
            d =>
                d.col === 'id'
                    ? d.text.indexOf(':') > -1
                        ? d.text.substring(d.text.lastIndexOf(':') + 1)
                        : d.text.substring(1)
                    : d.col.indexOf('query') < 0
                        ? d3.format('%')(d.text)
                        : d.text
        );
}
