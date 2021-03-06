import updateRange from './addCell/updateRange';

export default function addCell(ws, value, type, styles, range, row, col) {
    updateRange(range, row, col);
    styles.fill.fgColor.rgb = row > 0 ? styles.fill.fgColor.rgb : 'FFffffff';
    const cell = { v: value, t: type, s: styles };
    const cell_ref = XLSX.utils.encode_cell({ c: col, r: row });
    ws[cell_ref] = cell;
}
