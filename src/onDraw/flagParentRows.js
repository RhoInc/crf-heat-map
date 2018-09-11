export default function flagParentRows() {
    this.rows.classed('grayParent', d => d.filtered && d.visible_child);
}
