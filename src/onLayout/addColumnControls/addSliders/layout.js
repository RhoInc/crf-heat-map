export default function layout(filter) {
    const context = this;

    var isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
    if (isIE) {
      //add containing div to header cell
      filter.div = filter.cell
          .append('div')
          .datum(filter)
          .classed('range-slider-container', true);

      //lower slider
      filter.lowerSlider = filter.div
          .append('input')
          .classed('range-value filter-value--lower', true)
          .attr({
              type: 'number',
              min: 0,
              step: 1,
              value: 0
          })


          filter.div.append('text').classed('text',true)
          .text(d =>d.variable.indexOf('query') < 0 ? '% - ' : ' - ')

      //upper slider
      filter.upperSlider = filter.div
          .append('input')
          .classed('range-value filter-value--upper', true)
          .attr({
              type: 'number',
              min: 0,
              step: 1,
              value: 100
          });

          filter.div.append('text').classed('text',true)
          .text(d =>d.variable.indexOf('query') < 0 ? '%' : '')


    }
    else {


    //add containing div to header cell
    filter.div = filter.cell
        .append('div')
        .datum(filter)
        .classed('range-slider-container', true);

    //lower slider
    filter.lowerSlider = filter.div
        .append('input')
        .classed('range-slider filter-slider--lower', true)
        .attr({
            type: 'range',
            step: filter.variable.indexOf('query') < 0 ? 0.01 : 1,
            min: 0
        });

    filter.lowerAnnotation = filter.div
        .append('span')
        .classed('range-annotation range-annotation--lower', true);

    //upper slider
    filter.upperSlider = filter.div
        .append('input')
        .classed('range-slider filter-slider--upper', true)
        .attr({
            type: 'range',
            step: filter.variable.indexOf('query') < 0 ? 0.01 : 1,
            min: 0
        });
    filter.upperAnnotation = filter.div
        .append('span')
        .classed('range-annotation range-annotation--upper', true);

}

}
