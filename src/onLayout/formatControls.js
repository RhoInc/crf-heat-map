export default function formatControls() {
    const context = this;
    // assign classes based on control type and if it's a nesting filter

    this.controls.controlGroups = this.controls.wrap
        .selectAll('.control-group')
        .attr('class', d => `control-group chm-${d.type}`);

    //Group filters
    this.controls.filters = {
        container: this.controls.wrap
            .insert('div')
            .classed('chm-control-grouping chm-filters', true)
    };

    this.controls.filters.container
        .append('div')
        .classed('chm-control-grouping--label', true)
        .text('Filters');

    this.controls.filters.controlGroups = this.controls.wrap.selectAll('.chm-subsetter');
    this.controls.filters.labels = this.controls.filters.controlGroups.selectAll(
        '.wc-control-label'
    );
    this.controls.filters.selects = this.controls.filters.controlGroups.selectAll('.changer');
    this.controls.filters.controlGroups.each(function(d) {
        context.controls.filters.container.node().appendChild(this);
    });

    //Group other controls
    this.controls.otherControls = {
        container: this.controls.wrap
            .insert('div')
            .classed('chm-control-grouping chm-other-controls', true)
    };
    this.controls.otherControls.label = this.controls.otherControls.container
        .append('div')
        .classed('chm-control-grouping--label', true)
        .text('Controls');

    this.controls.otherControls.controlGroups = this.controls.wrap.selectAll(
        '.control-group:not(.chm-subsetter)'
    );
    this.controls.otherControls.labels = this.controls.otherControls.controlGroups.selectAll(
        '.wc-control-label'
    );
    this.controls.otherControls.controlGroups.each(function(d) {
        context.controls.otherControls.container.node().appendChild(this);
    });
}
