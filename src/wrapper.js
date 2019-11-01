//utility functions
import './util/polyfills';
import clone from './util/clone';
import merge from './util/merge';

//styles, configuration, and webcharts
import defineLayout from './defineLayout';
import defineStyles from './defineStyles';
import configuration from './configuration/index';
import { createControls, createTable } from 'webcharts';

//table callbacks
import onInit from './onInit';
import onLayout from './onLayout';
import onDraw from './onDraw';
import onDestroy from './onDestroy';

import init from './init';

export default function crfHeatMap(element, settings, testingUtilities) {
    //main object
    const crfHeatMap = {
        element,
        containers: {},
        settings: {
            user: settings
        },
        document: testingUtilities ? testingUtilities.dom.window.document : document,
        performance: testingUtilities ? testingUtilities.performance : performance,
        test: !!testingUtilities,
        init
    };

    //settings
    crfHeatMap.settings.defaults = Object.assign(
        {},
        configuration.rendererSettings(),
        configuration.webchartsSettings()
    ); // merge renderer-specific settings with Webcharts settings
    crfHeatMap.settings.merged = merge(crfHeatMap.settings.defaults, crfHeatMap.settings.user); // merge user settings with default settings
    crfHeatMap.settings.synced = configuration.syncSettings(crfHeatMap.settings.merged); // sync properties within merged settings, e.g. data mappings
    crfHeatMap.settings.controls = {
        inputs: configuration.syncControlInputs(crfHeatMap.settings.synced)
    }; // define control settings

    //DOM layout
    defineLayout.call(crfHeatMap);

    //stylesheet
    defineStyles.call(crfHeatMap);

    //controls
    crfHeatMap.controls = createControls(
        crfHeatMap.containers.controls.node(),
        crfHeatMap.settings.controls
    );

    //table
    crfHeatMap.table = createTable(
        crfHeatMap.containers.table.node(),
        crfHeatMap.settings.synced,
        crfHeatMap.controls
    );
    crfHeatMap.table.parent = crfHeatMap;
    crfHeatMap.table.initial_config = crfHeatMap.settings.synced;
    crfHeatMap.table.on('init', onInit);
    crfHeatMap.table.on('layout', onLayout);
    crfHeatMap.table.on('draw', onDraw);
    crfHeatMap.table.on('destroy', onDestroy);

    crfHeatMap.destroy = () => {
        crfHeatMap.table.destroy();
    };

    return crfHeatMap;
}
