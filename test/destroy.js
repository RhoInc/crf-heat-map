import jsdom from 'jsdom';
import crfHeatMap from '../src/wrapper.js';
import expect from 'expect';

describe('The destroy method is called.', () => {
    const { JSDOM } = jsdom;
    global.window = new JSDOM(``, { runScripts: 'dangerously' }).window;
    let dom, container, instance;

    before(() => {
        dom = new JSDOM('<!doctype html>');
        container = dom.window.document.createElement('div');
    });

    after(() => {});

    beforeEach(() => {
        instance = crfHeatMap(container, {}, { dom });
    });

    afterEach(() => {});

    it('should remove the stylesheet', function() {
        instance.destroy();
        expect(dom.window.document.styleSheets.length).toEqual(0);
    });

    it('should remove all nodes from container', function() {
        instance.destroy();
        expect(container.querySelectorAll('*').length).toEqual(0);
    });
});
