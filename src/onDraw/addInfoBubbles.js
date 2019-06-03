export default function addInfoBubbles() {
    const chart = this;

    // add info bubbles and either info text, if defined, or the name of variable
    chart.wrap
        .select('tr')
        .selectAll('th:not(.id)')
        .data(chart.initial_config.value_cols)
        .attr('title', d => d.description)
        .style('cursor', 'help');
}
