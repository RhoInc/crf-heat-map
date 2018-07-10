export const firstColumnWidth = 16;
export const otherColumnWidth = 10.5;
export const paddingRight = 6;
export const paddingLeft = 6;
export const border = 1;

export default function defineStyles() {
    const styles = [
        '#crf-heat-map {' +
            '}',
        '.chm-column {' +
            '    display: inline-block;' +
            '}',
        '.chm-column > * {' +
            '    width: 100%;' +
            '}',
        '.chm-row {' +
            '    display: inline-block;' +
            '}',
        '.chm-row > * {' +
            '    display: inline-block;' +
            '}',
        '.chm-row--1 {' +
            '    height: 67px;' +
            '    padding-bottom: 10px;' +
            '    border-bottom: 1px solid lightgray;' +
            '    margin-bottom: 10px;' +
            '}',

        /***--------------------------------------------------------------------------------------\
          Left column
        \--------------------------------------------------------------------------------------***/

            '#chm-left-column {' +
                '    float: left;' +
                '    width: 19.4%;' +
                '    padding-right: .5%;' +
                '}',

            /****---------------------------------------------------------------------------------\
              Controls
            \---------------------------------------------------------------------------------****/

                '#chm-controls .wc-controls {' +
                    '    margin-right: 10px;' +
                    '}',
                '#chm-controls .control-group {' +
                    '    width: 100%;' +
                    '    margin: 0 0 5px 0;' +
                    '}',
                '#chm-controls .control-group > * {' +
                    '    display: inline-block !important;' +
                    '    margin: 0;' +
                    '}',
                '#chm-controls .wc-control-label {' +
                    '    width: 58%;' +
                    '    text-align: right;' +
                    '}',
                '#chm-controls .span-description {' +
                    '}',
                '#chm-controls select.changer {' +
                    '    width: 40%;' +
                    '    float: right;' +
                    '}',
                '#chm-controls input.changer {' +
                    '    margin-left: 2% !important;' +
                    '}',

        /***--------------------------------------------------------------------------------------\
          Right column
        \--------------------------------------------------------------------------------------***/

            '#chm-right-column {' +
                '    float: right;' +
                '    width: 79.4%;' +
                '    border-left: 1px solid lightgray;' +
                '    padding-left: .5%;' +
                '}',
            '#chm-right-column-row-1 > * {' +
                '    display: inline-block;' +
                '}',
            '#chm-right-column-row-2 > * {' +
                '}',

            /****---------------------------------------------------------------------------------\
              Nest controls
            \---------------------------------------------------------------------------------****/

                '#chm-nest-controls {' +
                    `    width: ${firstColumnWidth}%;` +
                    '    height: 100%;' +
                    '}',
                '.chm-nest-control {' +
                    '    float: left;' +
                    '    display: block;' +
                    '    clear: left;' +
                    `    padding-left: ${paddingLeft}px;` +
                    '}',
                '#chm-nest-control--1 {' +
                    '    margin-left: 0;' +
                    '}',
                '#chm-nest-control--2 {' +
                    '    margin-left: 1em;' +
                    '}',
                '#chm-nest-control--3 {' +
                    '    margin-left: 2em;' +
                    '}',

            /****---------------------------------------------------------------------------------\
              Legend
            \---------------------------------------------------------------------------------****/

                '#chm-legend-container {' +
                    `    width: ${100 - firstColumnWidth}%;` +
                    '    float: right;' +
                    '    display: inline-block;' +
                    '    height: 100%;' +
                    '}',
                '.chm-legend {' +
                    '    padding-top: 17px;' +
                    '    display: inline-block;' +
                    '}',
                '.chm-legend > * {' +
                    '}',
                '#chm-crf-legend {' +
                    '    float: left;' +
                    '    width: 74.9%;' +
                    '}',
                '#chm-query-legend {' +
                    '    float: right;' +
                    '    width: 24.9%;' +
                    '}',

                '.chm-legend-title {' +
                    '    font-size: 20px;' +
                    '    font-weight: bold;' +
                    '}',

                '#chm-query-legend .chm-legend-title {' +
                    '    text-align: right;' +
                    '}',

                '.chm-legend-div {' +
                    '    display: inline-block;' +
                    '    height: 20px;' +
                    '    text-align: center;' +
                    '    font-weight: bold;' +
                    '    font-size: 14px;' +
                    '}',
                '#chm-crf-legend .chm-legend-div {' +
                    '    width: 20%;' +
                    '}',
                '#chm-query-legend .chm-legend-div {' +
                    '    width: 20%;' +
                    '}',

            /****---------------------------------------------------------------------------------\
              Table
            \---------------------------------------------------------------------------------****/

                '#chm-table {' +
                    '    width: 100%;' +
                    '}',
                '#chm-table table {' +
                    '    display: table;' +
                    '}',




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
            `    width: ${firstColumnWidth}% !important;` +
            '    text-align: left;' +
            '}',
        '.wc-table table thead tr:not(#column-controls) th:nth-child(n + 2),' +
        '.wc-table table tbody tr td:nth-child(n + 2) {' +
            `    width: ${otherColumnWidth}% !important;` +
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
            '    border: 1px solid white;' +
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
    this.style = document.createElement('style');
    this.style.type = 'text/css';
    this.style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(this.style);
}
