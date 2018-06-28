import createNestControls from './defineLayout/createNestControls';

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
            .classed('chm-column chm-column--left', true);

            this.containers.dataExport = this.containers.leftColumn
                .append('div')
                .classed('chm-row chm-row--1 chm-data-export', true);

            this.containers.controls = this.containers.leftColumn
                .append('div')
                .classed('chm-row chm-row--2 chm-controls chm-controls--main', true);

    /**-------------------------------------------------------------------------------------------\
	  Right column
    \-------------------------------------------------------------------------------------------**/

        this.containers.rightColumn = this.containers.main
            .append('div')
            .classed('chm-column chm-column--right', true);

            this.containers.nestControls = this.containers.rightColumn
                .append('div')
                .classed('chm-row chm-row--1 chm-controls chm-controls--nests', true);
            createNestControls.call(this);

            this.containers.table = this.containers.rightColumn
                .append('div')
                .classed('chm-row chm-row--2 chm-table', true);
}
