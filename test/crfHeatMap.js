import jsdom from 'jsdom';
import { performance } from 'perf_hooks';
import crfHeatMap from '../src/wrapper.js';
import expect from 'expect';
import d3 from 'd3';
import { createChart, createTable, createControls } from 'webcharts';

describe('The crfHeatMap function is called.', () => {
    const { JSDOM } = jsdom;
    global.window = new JSDOM(``, { runScripts: 'dangerously' }).window;
    let dom, container, instance;

    before(() => {
        dom = new JSDOM('<!doctype html>');
        container = dom.window.document.createElement('div');
    });

    after(() => {});

    beforeEach(() => {
        instance = crfHeatMap(container, {}, { dom, performance });
    });

    afterEach(() => {});

    it('should return the Performance interface object and the document object', () => {
        const utilities = ['performance', 'document'];
        expect(Object.keys(instance)).toEqual(expect.arrayContaining(utilities));
    });

    it('should return a containers object with properties that reference d3 selections', () => {
        const properties = [
            'main',
            'leftColumn',
            'leftColumnRow1',
            'leftColumnRow2',
            'rightColumn',
            'rightColumnRow1',
            'rightColumnRow2',
            'legend',
            'crfLegend',
            'queryLegend',
            'controls',
            'loading',
            'table',
            'dataExport'
        ];

        const d3selections = Object.keys(instance.containers).filter(
            key =>
                Object.keys(Object.getPrototypeOf(instance.containers[key])).join(',') ===
                Object.keys(Object.getPrototypeOf(d3.select())).join(',')
        );
        expect(d3selections).toEqual(expect.arrayContaining(properties));
    });

    it('should return a stylesheet', () => {
        expect(instance.style.tagName).toEqual('STYLE');
    });

    it('should return a webcharts controls object', () => {
        const controlsProperties = Object.keys(
            createControls(dom.window.document.createElement('div'))
        );
        expect(Object.keys(instance.controls)).toEqual(expect.arrayContaining(controlsProperties));
    });

    it('should return a webcharts table object', () => {
        const tableProperties = Object.keys(createTable(dom.window.document.createElement('div')));
        expect(Object.keys(instance.table)).toEqual(expect.arrayContaining(tableProperties));
    });
});
