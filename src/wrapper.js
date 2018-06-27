//utility functions
import './util/polyfills';
import clone from './util/clone';
import merge from './util/merge';

//styles, configuration, and webcharts
import defineStyles from './defineStyles';
import configuration from './configuration/index';
import { createControls, createTable } from 'webcharts';

//table callbacks
import onInit from './onInit';
import onLayout from './onLayout';
import onDraw from './onDraw';

export default function crfHeatMap(element, settings) {
    const defaultSettings = Object.assign(
        {},
        configuration.rendererSettings(),
        configuration.webchartsSettings()
    );
    const mergedSettings = merge(defaultSettings, settings); //Merge user settings onto default settings.
    const syncedSettings = configuration.syncSettings(mergedSettings); //Sync properties within merged settings, e.g. data mappings.
    const syncedControlInputs = configuration.syncControlInputs(syncedSettings); //Sync merged settings with controls.

    const controls = createControls(element, {
        location: 'top',
        inputs: syncedControlInputs
    });
    const table = createTable(element, syncedSettings, controls);

    table.initial_config = syncedSettings;

    table.on('init', onInit);
    table.on('layout', onLayout);
    table.on('draw', onDraw);

    defineStyles.call(table);

    return table;
}
