import jsdom from 'jsdom';
import crfHeatMap from '../src/wrapper.js';
import expect from 'expect';
import d3 from 'd3';
const data = require('./forms.json');

describe('The init method is called.', () => {
    const { JSDOM } = jsdom;
    global.window = (new JSDOM(``, { runScripts: "dangerously" })).window;
    let dom, container, instance;

    before(() => {
        dom = new JSDOM('<!doctype html>');
        container = dom.window.document.createElement('div');
    });

    after(() => {
    });

    beforeEach(() => {
        instance = crfHeatMap(container, {exportable: false}, dom);
        instance.init(data, true);
    });

    afterEach(() => {
        instance.destroy();
    });

    it('should attach data to the webcharts chart object', function() {
        expect(instance.raw_data.length).toEqual(data.length);
    });
});
