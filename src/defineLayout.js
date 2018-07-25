import createNestControls from './defineLayout/createNestControls';
import drawCrfLegend from './defineLayout/drawCrfLegend';
import drawQueryLegend from './defineLayout/drawQueryLegend';

export default function defineLayout() {
    this.containers = {
        main: d3.select(this.element)
            .append('div')
            .attr('id', 'crf-heat-map'),
    };

    /**-------------------------------------------------------------------------------------------\
	  Left column
    \-------------------------------------------------------------------------------------------**/

        this.containers.leftColumn = this.containers.main
            .append('div')
            .classed('chm-column', true)
            .attr('id', 'chm-left-column');

        /***--------------------------------------------------------------------------------------\
          Row 1
        \--------------------------------------------------------------------------------------***/

            this.containers.leftColumnRow1 = this.containers.leftColumn
                .append('div')
                .classed('chm-row chm-row--1', true)
                .attr('id', 'chm-left-column-row-1');

            this.containers.dataExport = this.containers.leftColumnRow1
                .append('div')
                .classed('chm-section', true)
                .attr('id', 'chm-data-export');
            this.containers.leftColumnRow1
                .append('div')
                .classed('chm-label', true)
                .attr('id', 'chm-nest-label')
                .text('Summarize by:');
            this.containers.leftColumnRow1
                .append('div')
                .classed('chm-label', true)
                .attr('id', 'chm-controls-label')
                .text('');
            this.containers.loading = this.containers.leftColumnRow1
                .append('div')
                .attr('id', 'chm-loading')
                .text('Loading...');

        /***--------------------------------------------------------------------------------------\
          Row 2
        \--------------------------------------------------------------------------------------***/

            this.containers.leftColumnRow2 = this.containers.leftColumn
                .append('div')
                .classed('chm-row chm-row--2', true)
                .attr('id', 'chm-left-column-row-2');

            this.containers.controls = this.containers.leftColumnRow2
                .append('div')
                .classed('chm-section', true)
                .attr('id', 'chm-controls');

    /**-------------------------------------------------------------------------------------------\
	  Right column
    \-------------------------------------------------------------------------------------------**/

        this.containers.rightColumn = this.containers.main
            .append('div')
            .classed('chm-column', true)
            .attr('id', 'chm-right-column');

        /***--------------------------------------------------------------------------------------\
          Row 1
        \--------------------------------------------------------------------------------------***/

            this.containers.rightColumnRow1 = this.containers.rightColumn
                .append('div')
                .classed('chm-row chm-row--1', true)
                .attr('id', 'chm-right-column-row-1');

            this.containers.nestControls = this.containers.rightColumnRow1
                .append('div')
                .classed('chm-section', true)
                .attr('id', 'chm-nest-controls');
            createNestControls.call(this);

            this.containers.legend = this.containers.rightColumnRow1
                .append('div')
                .classed('chm-section', true)
                .attr('id', 'chm-legend-container');

            this.containers.crfLegend = this.containers.legend
                .append('div')
                .classed('chm-legend', true)
                .attr('id', 'chm-crf-legend');
            drawCrfLegend.call(this);

            this.containers.queryLegend = this.containers.legend
                .append('div')
                .classed('chm-legend', true)
                .attr('id', 'chm-query-legend');
            drawQueryLegend.call(this);

        /***--------------------------------------------------------------------------------------\
          Row 2
        \--------------------------------------------------------------------------------------***/

            this.containers.rightColumnRow2 = this.containers.rightColumn
                .append('div')
                .classed('chm-row chm-row--2', true)
                .attr('id', 'chm-right-column-row-2');

            this.containers.table = this.containers.rightColumnRow2
                .append('div')
                .classed('chm-section', true)
                .attr('id', 'chm-table');
}
