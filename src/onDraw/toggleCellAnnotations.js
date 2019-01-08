import customizeCells from './customizeCells';

export default function toggleCellAnnotations() {
    // hide annotations and add event handiing to show them on hover
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
    } else {
        // had back annotations with proper styling and remove hovering events
        this.cells
            .filter(d => d.col !== 'id' && !d.hasOwnProperty('id'))
            .style('color', null)
            .on('mouseover', null)
            .on('mouseout', null);
    }
}
