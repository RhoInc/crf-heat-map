export default function toggleCellAnnotations() {
    if (!this.config.display_cell_annotations) {
        this.cells
            .filter(d => d.col !== 'id' && !d.hasOwnProperty('id'))
            .style('color', 'transparent')
            .on('mouseover', function() {
                const level = +this.className.replace(/(.*)(level)(\d+)(.*)/, '$3');
                this.style.color = [6, 7, 8, 1, 2, 3].indexOf(level) > -1 ? 'black' : 'white';
            })
            .on('mouseout', function() {
                this.style.color = 'transparent';
            });
    }
}
