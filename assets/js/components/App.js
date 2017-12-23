import { Map2DModel } from './Map2D'
import { SleepModeModel } from './SleepMode'

import RunningMapConfig from './../../datas/running-map-01'

export class AppModel {

    init () {
        this.initMap();
        this.initSleepMode();
    }

    initMap () {
        let Map2D = new Map2DModel(RunningMapConfig);
    }

    initSleepMode () {
        let SleepMode = new SleepModeModel(1000, document.body, 'sleepMode-active');
        SleepMode.watch([
            {
                target: document,
                event: 'click'
            }, {
                target: document,
                event: 'mousemove'
            }
        ]);
    }

};