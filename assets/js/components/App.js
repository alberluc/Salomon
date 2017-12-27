import { MapReliefModel } from './Maps/MapRelief'
import { SleepMode as SleepModeModel } from './SleepMode/SleepMode'
import { User as UserModel } from './User/User'
import { Script as ScriptModel } from './Script/Script'
import { Race as RaceModel } from './Race/Race'
import { UnitsBuilder as UnitsBuilderModel } from './Utils/UnitsBuilder'

import RaceScriptConfig_01 from '../../datas/race-script-01'

export class App {

    /**
     * Initialise l'application
     */
    init () {
        this.initScript(RaceScriptConfig_01);
        this.initMapRelief();
        this.initSleepMode();
        this.initUser();
        this.initRace();
    }

    /**
     * Initialise le script
     * @param script Script qui va définir le contexte de l'application
     */
    initScript (script) {
        this.UnitsBuilder = new UnitsBuilderModel(script.base.units);
        this.Script = new ScriptModel(script, this.UnitsBuilder);
    }

    /**
     * Initialise la map en relief
     */
    initMapRelief () {
        let MapRelief = new MapReliefModel(document.getElementById('map2D'), this.Script);
        MapRelief.load();
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

    initRace () {
        this.Race = new RaceModel();
    }

    initUser () {
        this.User = new UserModel(this.Script, this.UnitsBuilder, 0);
        this.User.position = 50;
        this.User.incrementPosition();
    }

};