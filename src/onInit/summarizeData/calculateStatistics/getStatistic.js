import { sum } from 'd3';

export default function getStatistic(numerator_count, denominator_count, type) {
    if (type === 'queries' && denominator_count !== undefined) {
        throw "Query Columns are sums and should not have denominators. Check the renderer settings and verify that there are no columns with denominators in value_cols with the type 'queries'.";
    }

    var statistic =
        type == 'crfs'
            ? denominator_count
                ? Math.floor((numerator_count / denominator_count) * 100) / 100
                : 'N/A'
            : type == 'queries'
            ? numerator_count
            : console.log('Missed a Statistic!');

    return statistic;
}
