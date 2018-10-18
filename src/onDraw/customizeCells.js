export default function customizeCells() {
    this.cells = this.tbody.selectAll('td');
    this.cells
        .attr('class', d => {
console.log(d)

            let cellClass = 'chm-cell';

            if (d.col === 'id')
                cellClass =
                    cellClass +
                    ' chm-cell--id' +
                    ' chm-cell--id--level' +
                    d.text.split('  |').length;
            else {
                cellClass = cellClass + ' chm-cell--heat';
                let level;
                if (d.col.indexOf('query') > -1)
                    level =
                        d.text === 0 ? 5 : d.text < 9 ? 4 : d.text < 17 ? 3 : d.text < 25 ? 2 : 1;
                else
                    level =
                        d.text === 'N/A'
                            ? 11
                            : d.text === 1
                                ? 10
                                : d.text > 0.75
                                    ? 9
                                    : d.text > 0.5
                                        ? 8
                                        : d.text > 0.25
                                            ? 7
                                            : 6;
                cellClass = cellClass + ' chm-cell--heat--level' + level;
            }

            return cellClass;
        })
        .text(
            d =>
                d.col === 'id'
                    ? d.text.split('  |')[d.text.split('  |').length - 1]
                    : d.col.indexOf('query') < 0
                        ? d.text === 'N/A'
                            ? d.text
                            : String(Math.floor(d.text * 100)) + '%'
                        : d.text
        );
}
