export default function defineStyles() {
    const styles = [
        '.row--hidden {' + '    display: none;' + '}',

        /* ID cells */

        '.cell--id {' + '    background: white;' + 'width: 90px;' + '}',
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
        '.cell--heat--level1:hover,' +
            '.cell--heat--level2:hover,' +
            '.cell--heat--level3:hover {' +
            '    color: black;' +
            '}',
        '.cell--heat--level4:hover,' + '.cell--heat--level5:hover {' + '    color: white;' + '}',
        '.cell--heat--level1 {' + '    background: #eff3ff;' + '}',
        '.cell--heat--level2 {' + '    background: #bdd7e7;' + '}',
        '.cell--heat--level3 {' + '    background: #6baed6;' + '}',
        '.cell--heat--level4 {' + '    background: #3182bd;' + '}',
        '.cell--heat--level5 {' + '    background: #08519c;' + '}'
    ];

    //Attach styles to DOM.
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);
}
