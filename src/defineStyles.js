export const firstColumnWidth = 200;
export const otherColumnWidth = 120;
export const margin = 0;
export const paddingRight = 6;
export const paddingLeft = 6;
export const border = 1;

export default function defineStyles() {
    const styles = [
        '.row--hidden {' +
            '    display: none;' +
            '}',
        '.wc-table table thead tr th,' +
        '.wc-table table tbody tr td {' +
            `    padding-right: ${paddingRight}px;` +
            `    padding-left: ${paddingLeft}px;` +
            '}',
        '.wc-table table thead tr th:first-child,' +
        '.wc-table table tbody tr td:first-child {' +
            `    width: ${firstColumnWidth}px !important;` +
            '    text-align: left;' +
            '}',
        '.wc-table table thead tr:not(#column-controls) th:nth-child(n + 2),' +
        '.wc-table table tbody tr td:nth-child(n + 2) {' +
            `    width: ${otherColumnWidth}px !important;` +
            '    text-align: left;' +
            '}',
        '.wc-table table tbody tr:hover td {' +
            '    border-bottom: 1px solid black;' +
            '}',
        '.wc-table table tbody tr:hover td:first-child {' +
            '    border-left: 1px solid black;' +
            '}',

        /* range sliders */

        '#column-controls th {' +
            '}',
        '.reset-button {' +
            '    width: 100%;' +
            '}',
        '.range-slider-container {' +
            '    position: relative;' +
            '    width: 100%;' +
            '    height: 30px;' +
            '}',
        '.range-slider {' +
            '    width: 100%;' +
            '    pointer-events: none;' +
            '    position: absolute;' +
            '    height: 15px;' +
            '    top: 1px;' +
            '    overflow: hidden;' +
            '    outline: none;' +
            '}',
        '.range-annotation {' +
            '    width: 100%;' +
            '    position: absolute;' +
            '    font-size: 12px;' +
            '    top: 16px;' +
            '    overflow: hidden;' +
            '    font-weight: normal;' +
            '}',
        '.range-annotation--lower {' + '    text-align: left;' + '}',
        '.range-annotation--upper {' + '    text-align: right;' + '}',
        '.range-slider::-webkit-slider-thumb {' +
            '    pointer-events: all;' +
            '    position: relative;' +
            '    z-index: 1;' +
            '    outline: 0;' +
            '}',
        '.range-slider::-moz-range-thumb {' +
            '    pointer-events: all;' +
            '    position: relative;' +
            '    z-index: 10;' +
            '    -moz-appearance: none;' +
            '    width: 9px;' +
            '}',
        '.range-slider::-moz-range-track {' +
            '    position: relative;' +
            '    z-index: -1;' +
            '    background-color: rgba(0, 0, 0, 1);' +
            '    border: 0;' +
            '}',
        '.range-slider::-moz-range-track {' +
            '    -moz-appearance: none;' +
            '    background: none transparent;' +
            '    border: 0;' +
            '}',
        '.range-slider::-moz-focus-outer {' + '    border: 0;' + '}',
        '.filter-value--lower {' +
          '    width: 40px' +
        '}',
        '.filter-value--upper {' +
          '    width: 40px' +
        '}',
        /* ID cells */

        '.cell--id {' + '    background: white;' + '}',

        '.row--expandable .cell--id {' +
            '    color: blue;' +
            '    cursor: pointer;' +
            '    text-decoration: underline;' +
            '}',
        '.cell--id--level2 {' + '    text-indent: 1em;' + '}',
        '.cell--id--level3 {' + '    text-indent: 2em;' + '}',

        /* heat cells */

        '.cell--heat {' +
            '    text-align: right;' +
            '    font-size: 12px;' +
            '}',
        '.cell--heat--level6,' +
            '.cell--heat--level7,' +
            '.cell--heat--level8,' +
            '.cell--heat--level1,' +
            '.cell--heat--level2,' +
            '.cell--heat--level3 {' +
            '    color: black;' +
            '}',
        '.cell--heat--level9,' +
            '.cell--heat--level10,' +
            '.cell--heat--level11,' +
            '.cell--heat--level4,' +
            '.cell--heat--level5 {' +
            '    color: white;' +
            '}',
        '.cell--heat--level1 {' + '    background: #edf8e9;' + '}',
        '.cell--heat--level2 {' + '    background: #bae4b3;' + '}',
        '.cell--heat--level3 {' + '    background: #74c476' + '}',
        '.cell--heat--level4 {' + '    background: #31a354;' + '}',
        '.cell--heat--level5 {' + '    background: #006d2c;' + '}',
        '.cell--heat--level6 {' + '    background: #eff3ff;' + '}',
        '.cell--heat--level7 {' + '    background: #bdd7e7;' + '}',
        '.cell--heat--level8 {' + '    background: #6baed6' + '}',
        '.cell--heat--level9 {' + '    background: #3182bd;' + '}',
        '.cell--heat--level10 {' + '    background: #08519c;' + '}',
        '.cell--heat--level11 {' + '    background: #08519c;' + '    color: white;' + '}'
    ];

    //Attach styles to DOM.
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);
}
