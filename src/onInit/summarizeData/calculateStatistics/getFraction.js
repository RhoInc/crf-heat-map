import { sum } from 'd3';

export default function getFraction(numerator_count, denominator_count, type) {
    if (type === 'queries' && denominator_count !== undefined) {
        throw "Query Columns are sums and should not have denominators. Check the renderer settings and verify that there are no columns with denominators in value_cols with the type 'queries'.";
    }

    var fraction =
        type == 'crfs'
            ? denominator_count
                ? ' ' + numerator_count + '/' + denominator_count
                : ''
            : type == 'queries'
            ? ''
            : console.log('Missed a Fraction!');

    return fraction;
}
