import jsdom from 'jsdom';
import getFraction from '../src/onInit/summarizeData/calculateStatistics/getFraction.js';
import expect from 'expect';

describe('Calculate Fraction', () => {
    describe('Calculate CRF Fraction' , () => {
      it('should calculate Fraction', function() {
        const percentage = getFraction(7,9,"crfs");
        expect(percentage).toEqual(" 7/9");
      });
    });

    describe('Calculate Nothing when CRF lacks denominator' , () => {
      it('should return empty string', function() {
        const percentage = getFraction(7,undefined,"crfs");
        expect(percentage).toEqual("");
      });
    });

    describe('Calculate QUERY' , () => {
      it('should return empty string', function() {
        const count = getFraction(10, undefined,"queries");
        expect(count).toEqual("");
      });
    });

    describe('Error on QUERY with denomiator', () => {
      it('should throw error', function() {
        expect(() => {
          getFraction(12,15,"queries");
        }).toThrow();
      });
    });
});
