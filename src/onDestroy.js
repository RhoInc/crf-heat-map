export default function onDestroy() {
    //remove stylesheet
    document.getElementsByTagName('head')[0].lastChild.remove();

    //clear container
    d3.select(this.parent.element).html('');
}
