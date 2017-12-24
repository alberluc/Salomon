import { MapReliefModel } from './Maps/MapRelief'
import { SleepMode as SleepModeModel } from './SleepMode/SleepMode'
import { User as UserModel } from './User/User'
import { Script as ScriptModel } from './Script/Script'

import RaceScriptConfig_01 from '../../datas/race-script-01'

export class App {

    /**
     * Constructeur du composant App
     */
    constructor () {
        this.User = new UserModel();
    }

    /**
     * Initialise l'application
     */
    init () {
        this.initScript(RaceScriptConfig_01);
    }

    /**
     * Initialise l'application
     * @param script Script qui va définir le contexte de l'application
     */
    initScript (script) {
        this.Script = new ScriptModel(script);
        this.initMapRelief();
        this.initSleepMode();
    }

    /**
     * Initialise la map en relief
     */
    initMapRelief () {
        let MapRelief = new MapReliefModel(document.getElementById('map2D'));
        MapRelief.load(this.Script);
        MapRelief.build();
    }

    /**
     * Initialise le mode veille
     */
    initSleepMode () {
        let SleepMode = new SleepModeModel(25000, document.body, 'sleepMode-active');
        SleepMode.watch([
            {
                target: document,
                event: 'click'
            }, {
                target: document,
                event: 'mousemove'
            }
        ]);
        SleepMode.persistStop();
    }

};