export default function defineStyles() {
    const styles = [
        '.row--hidden {' + '    display: none;' + '}',

        /* ID cells */

        '.cell--id {' + '    background: white;' + '    width: 90px;' + '}',

        '.row--expandable .cell--id {' +
            '    color: blue;' +
            '    cursor: pointer;' +
            '    text-decoration: underline;' +
            '}',
        '.cell--id--level1 {' + '    padding-left: 0em !important;' + '}',
        '.cell--id--level2 {' + '    padding-left: 1em !important;' + '}',
        '.cell--id--level3 {' + '    padding-left: 2em !important;' + '}',

        /* heat cells */

        '.cell--heat {' +
            '    text-align: center;' +
            '    color: transparent;' +
            '    width: 150px;' +
            '}',
        '.cell--heat--level6:hover,' +
            '.cell--heat--level7:hover,' +
            '.cell--heat--level8:hover,' +
            '.cell--heat--level1:hover,' +
            '.cell--heat--level2:hover,' +
            '.cell--heat--level3:hover {' +
            '    color: black;' +
            '}',
        '.cell--heat--level9:hover,' +
          '.cell--heat--level10:hover,' +
          '.cell--heat--level11:hover,' +
            '.cell--heat--level4:hover,' +
            '.cell--heat--level5:hover {' +
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
        '.cell--heat--level11 {' +
            '    background: #08519c;' + '    color: white;' +
            '}'
    ];

    //Attach styles to DOM.
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);
}
