import update from './update';
import filterData from '../filterData';

export default function addEventListeners(filter) {
    const context = this;

    //Attach an event listener to Input Boxes.
    filter.inputBoxes = filter.div.selectAll('.range-value').on('change', function(d) {
        const loadingdiv = context.parent.containers.main.select('#chm-loading');

        loadingdiv.classed('chm-hidden', false);

        const loading = setInterval(() => {
            const loadingIndicated = loadingdiv.style('display') !== 'none';

            if (loadingIndicated) {
                clearInterval(loading);
                loadingdiv.classed('chm-hidden', true);

                const boxes = this.parentNode.parentNode.getElementsByTagName('input');
                const box1 = parseFloat(boxes[0].value);
                const box2 = parseFloat(boxes[1].value);

                if (box1 <= box2) {
                    if (context.typeDict[d.variable] == 'crfs') {
                        d.lower = box1 / 100;
                        d.upper = box2 / 100;
                    } else {
                        d.lower = box1;
                        d.upper = box2;
                    }
                } else {
                    if (context.typeDict[d.variable] == 'crfs') {
                        d.lower = box2 / 100;
                        d.upper = box1 / 100;
                    } else {
                        d.lower = box2;
                        d.upper = box1;
                    }
                }
                context.columnControls.filtered = true;
                update.call(context, d);
                filterData.call(context);
                context.draw(context.data.raw);
            }
        }, 25);
    });
}
