import resetFilters from './addResetButton/resetFilters';

export default function addResetButton(th, d) {
    const resetText = this.initial_config.sliders ? 'Sliders' : 'Ranges';

    const resetButton = {};
    resetButton.container = d3
        .select(th)
        .append('div')
        .classed('reset-button-container', true);

    resetButton.button = resetButton.container
        .append('button')
        .classed('reset-button', true)
        .text('Reset ' + resetText)
        .on('click', () => {
            resetFilters.call(this);
            this.draw(this.data.top);
            this.rows.classed('grayParent', false);
        });
    this.columnControls.resetButton = resetButton;
}
