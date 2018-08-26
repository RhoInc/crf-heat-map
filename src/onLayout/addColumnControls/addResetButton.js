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
            .text('Reset Ranges') // changed the name for IE
            .on('click', () => {
                this.data.raw = this.data.summarized;
                resetFilters.call(this);
                this.draw(this.data.raw);
            });

    this.columnControls.resetButton = resetButton;
}
