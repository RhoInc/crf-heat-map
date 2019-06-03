export default function onDestroy() {
    //remove stylesheet
    this.parent.style.remove();

    //clear container, removing one child node at a time (fastest method per https://jsperf.com/innerhtml-vs-removechild/37)
    const node = d3.select(this.parent.element).node();
    while (node.firstChild) node.removeChild(node.firstChild);
}
