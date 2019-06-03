export default function addIdHover() {
    this.cells.filter(d => d.col === 'id').attr('title', d =>
        d.text
            .split('|')
            .slice(-1)
            .pop()
    );
}
