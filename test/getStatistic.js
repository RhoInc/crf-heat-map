import jsdom from 'jsdom';
import getStatistic from '../src/onInit/summarizeData/calculateStatistics/getStatistic.js';
import expect from 'expect';
import d3 from 'd3';

describe('Calculate statistic', () => {
    describe('Calculate CRF Percentage' , () => {
      it('should calculate percentage and round down', function() {
        const percentage = getStatistic(7,9,"crfs");
        expect(percentage).toEqual(0.77);
      });
    });

    describe('Generate N/A when CRF lacks denominator' , () => {
      it('should return N/A', function() {
        const percentage = getStatistic(7,undefined,"crfs");
        expect(percentage).toEqual("N/A");
      });
    });

    describe('Calculate QUERY Sum' , () => {
      it('should calculate sum', function() {
        const count = getStatistic(10, undefined,"queries");
        expect(count).toEqual(10);
      });
    });

    describe('Error on QUERY with denomiator', () => {
      it('should throw error', function() {
        expect(() => {
          getStatistic(12,15,"queries");
        }).toThrow();
      });
    });
});
