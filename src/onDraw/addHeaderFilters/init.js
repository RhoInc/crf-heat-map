export default function init() {
    var sliderSections = document.getElementsByClassName('range-slider');
        for( var x = 0; x < sliderSections.length; x++ ){
            var sliders = sliderSections[x].getElementsByTagName('input');
            for( var y = 0; y < sliders.length; y++ ){
                if( sliders[y].type ==='range' ){
                    sliders[y].oninput = this.yearRangeSliders.getVals;
                    // Manually trigger event first time to display values
                    sliders[y].oninput();
                }
            }
        }
}
