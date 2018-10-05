export default function addInfoBubbles() {
    const chart = this;

    const infoMapping = {
        is_partial_entry: 'Data have been submitted in the EDC system.',
        verified: 'All required fields have source data verification complete in EDC.',
        ready_for_freeze:
            'All required cleaning is complete (e.g. SDV, queries resolved) and data are ready to be frozen in EDC.',
        is_frozen: 'Data have been frozen in the EDC system.',
        is_signed: 'Data have been signed in the EDC system.',
        is_locked: 'Data have been locked in the EDC system.',
        open_query_ct: 'Site has not responded to issue.',
        answer_query_ct: 'Site has responded to issue, DM needs to review.'
    };

    // add info bubbles and either info text, if defined, or the name of variable
    chart.wrap
        .select('tr')
        .selectAll('th:not(.id)')
        .data(chart.initial_config.value_cols)
        .append('span')
        .html(' &#9432')
        .attr('title', d => (d in infoMapping ? infoMapping[d] : d));
}
