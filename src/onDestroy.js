export default function onDestroy() {
    //remove stylesheet
    this.parent.style.remove();

    //clear container
    d3
        .select(this.parent.element)
        .selectAll('*')
        .remove();
}
