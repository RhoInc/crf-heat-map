export default function layout(filter) {
    const context = this;

    //add containing div to header cell
    filter.div = filter.cell
        .append('div')
        .datum(filter)
        .classed('range-slider-container', true);

    //lower slider
    filter.lowerSlider = filter.div
        .append('div')
        .classed('range-slider filter-slider--lower', true).attr("id", "lower")

        $(".range-slider").slider({

      range: true,

      min: 0,

      max: 100,

      values: [ 0, 100 ],

      slide: function( event, ui ) {

        $( ".range-annotation" ).val(ui.values[ 0 ] + "% - " + ui.values[ 1 ] + "%" );

      }

    });

    $( ".range-annotation" ).val($( ".range-slider" ).slider( "values", 0 ) +

      "% - " + $( ".range-slider" ).slider( "values", 1 ) + "%" );

  ;



    filter.lowerAnnotation = filter.div
        .append('span')
        .classed('range-annotation range-annotation--lower', true).append("p").append("input").attr({"type":"text", "readonly": true}
  )

    // //upper slider
    // filter.upperSlider = filter.div
    //     .append('input')
    //     .classed('range-slider filter-slider--upper', true)
    //     .attr({
    //         type: 'range',
    //         step: filter.variable.indexOf('query') < 0 ? 0.01 : 1,
    //         min: 0
    //     });
    // filter.upperAnnotation = filter.div
    //     .append('span')
    //     .classed('range-annotation range-annotation--upper', true);
}
