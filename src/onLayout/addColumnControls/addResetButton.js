import resetFilters from './addResetButton/resetFilters';

export default function addResetButton(th, d) {
    const resetButton = {};
    resetButton.container = d3
        .select(th)
        .append('div')
        .classed('reset-button-container', true);
    resetButton.button = resetButton.container
        .append('button')
        .classed('reset-button', true)
        .text('Reset sliders')
        .on('click', () => {
            resetFilters.call(this);
            this.data.raw = this.data.summarized;
            this.draw();
        });
    this.columnControls.resetButton = resetButton;
}
