import addSliders from './addHeaderFilters/addSliders';

export default function addColumnFilters() {
    const context = this;

    this.columnFilters = {
        header: this.thead.append('tr').attr('id', 'column-filters'),
        variables: this.config.cols.filter(d => d !== 'id'),
        sliders: [],
    };
    this.columnFilters.headers = this.columnFilters.header
        .selectAll('th')
            .data(this.config.cols)
            .enter()
        .append('th')
        .filter(d => d !== 'id')
        .each(function(d) {
            addSliders.call(context, this, d);
        });
    d3.merge(
        this.columnFilters.sliders
            .map(slider => [slider.lowerInput, slider.upperInput])
    )
    .forEach(slider => {
        slider.on('change', () => {
            console.log('something');
            this.draw();
        });
    });
}
