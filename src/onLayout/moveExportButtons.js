export default function moveExportButtons() {
    this.wrap
        .node()
        .insertBefore(
            this.wrap.select('.table-bottom').node(),
            this.wrap.select('.table-top').node()
        );
}
