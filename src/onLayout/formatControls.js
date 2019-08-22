export default function formatControls() {
    const context = this;

    const nest_vars = this.initial_config.nestings.map(nesting => nesting.value_col);

    // assign classes based on control type and if it's a nesting filter
    this.controls.controlGroups = this.controls.wrap
        .selectAll('.control-group')
        .attr('class', d => `control-group chm-${d.type}`)
        .classed('chm-nesting-filter', d => nest_vars.includes(d.value_col));

    if (this.initial_config.nesting_filters) {
        //Group nesting filters
        this.controls.filters = {
            container: this.controls.wrap
                .insert('div', '.chm-nesting-filter')
                .classed('chm-control-grouping chm-nesting-filters', true)
        };

        this.controls.filters.container
            .append('div')
            .classed('chm-control-grouping--label', true)
            .text('Nesting Filters');

        this.controls.filters.controlGroups = this.controls.wrap.selectAll('.chm-nesting-filter');
        this.controls.filters.labels = this.controls.filters.controlGroups.selectAll(
            '.wc-control-label'
        );
        this.controls.filters.selects = this.controls.filters.controlGroups.selectAll('.changer');
        this.controls.filters.controlGroups.each(function(d) {
            context.controls.filters.container.node().appendChild(this);
        });
    }

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
        '.control-group:not(.chm-nesting-filter)'
    );
    this.controls.otherControls.labels = this.controls.otherControls.controlGroups.selectAll(
        '.wc-control-label'
    );
    this.controls.otherControls.controlGroups.each(function(d) {
        context.controls.otherControls.container.node().appendChild(this);
    });
}
