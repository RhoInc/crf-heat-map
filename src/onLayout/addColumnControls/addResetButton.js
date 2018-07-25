import resetFilters from './addResetButton/resetFilters';

export default function addResetButton(th, d) {
    var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
    const resetButton = {};
    resetButton.container = d3
        .select(th)
        .append('div')
        .classed('reset-button-container', true);

    if (isIE) {
        resetButton.button = resetButton.container
            .append('button')
            .classed('reset-button', true)
            .text('Reset Ranges') // changed the name for IE
            .on('click', () => {
                this.data.raw = this.data.summarized;
                resetFilters.call(this);
                this.draw(this.data.raw);
            });
    } else {
        resetButton.button = resetButton.container
            .append('button')
            .classed('reset-button', true)
            .text('Reset sliders')
            .on('click', () => {
                this.data.raw = this.data.summarized;
                resetFilters.call(this);
                this.draw(this.data.raw);
            });
    }
    this.columnControls.resetButton = resetButton;
}
