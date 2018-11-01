export default function addInfoBubbles() {
    const chart = this;

    // add info bubbles and either info text, if defined, or the name of variable
    chart.wrap
        .select('tr')
        .selectAll('th:not(.id)')
        .data(chart.initial_config.value_cols)
        .append('span')
        .html(' &#9432')
        .attr('title', d => d.description);
}
