export default function addInfoBubbles() {
    const chart = this;

    var infoMapping = {
        is_partial_entry: 'there',
        verified: 'text',
        ready_for_freeze: 'text',
        is_frozen: 'Data is clean and there are no outstanding issues.- yo',
        is_signed: 'text',
        is_locked: 'text',
        open_query_ct: 'text',
        answer_query_ct: 'Site has responded to issue, DM needs to review.'
    };

    // add info bubbles and either info text, if defined, or the name of variable
    d3
        .select('tr')
        .selectAll('th:not(.id)')
        .data(chart.initial_config.value_cols)
        .append('span')
        .html(' &#9432')
        .attr('title', d => (d in infoMapping ? infoMapping[d] : d));
}
