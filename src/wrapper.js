import './util/object-assign';
import defineStyles from './defineStyles';
import merge from './util/merge';
import defaultSettings, { syncSettings, syncControlInputs } from './defaultSettings';
import { createControls, createTable } from 'webcharts';
import onInit from './onInit';
import onLayout from './onLayout';
import onDraw from './onDraw';
import clone from './util/clone';

export default function raveXplorer(element, settings) {
    const mergedSettings = merge(defaultSettings, settings), //Merge user settings onto default settings.
        syncedSettings = syncSettings(mergedSettings), //Sync properties within merged settings, e.g. data mappings.
        syncedControlInputs = syncControlInputs(syncedSettings), //Sync merged settings with controls.
        controls = createControls(element, {
            location: 'top',
            inputs: syncedControlInputs
        }), //Define controls.
        chart = createTable(element, mergedSettings, controls); //Define chart.

    chart.config = clone(mergedSettings);
    chart.on('init', onInit);
    chart.on('layout', onLayout);
    chart.on('draw', onDraw);

    defineStyles();

    return chart;
}
