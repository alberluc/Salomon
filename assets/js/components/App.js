import io from "socket.io-client";
import { MapRelief as MapReliefModel } from './Maps/MapRelief'
import { MapCourse as MapCourseModel } from './Maps/MapCourse'
import { SleepMode as SleepModeModel } from './SleepMode/SleepMode'
import { Script as ScriptModel } from './Script/Script'
import { UnitsBuilder } from './Utils/UnitsBuilder'
import { API_Light } from "../api/API_Ligth";
import { API_Movement } from "../api/API_Movement";
import { Ids, ClassNames } from "../../datas/dom";
import RaceScriptConfig_01 from '../../datas/race-script-01';

export class App {

    constructor () {
        this.socket = io();
    }

    /**
     * Initialise l'application
     */
    init () {
        this.initScript(RaceScriptConfig_01);
        this.initMapRelief();
        this.initSleepMode();
        this.initAPIs();
        this.tmp();
        this.Script.start();
    }

    /**
     * Initialise le script
     * @param script Script qui va définir le contexte de l'application
     */
    initScript (script) {
        this.UnitsBuilder = new UnitsBuilder(script.base.units, { distance: script.distance, altitude: script.altitude });
        this.Script = new ScriptModel(script, this.UnitsBuilder);
    }

    /**
     * Initialise la map en relief
     */
    initMapRelief () {
        let MapRelief = new MapReliefModel(document.getElementById(Ids.MAP_RELIEF), this.Script);
        MapRelief.load();
        MapRelief.build();
        let MapCourse = new MapCourseModel(document.getElementById(Ids.MAP_COURSE), this.Script);
        MapCourse.load();
        MapCourse.build();
    }

    /**
     * Initialise le mode veille
     */
    initSleepMode () {
        let SleepMode = new SleepModeModel(25000, document.body, ClassNames.SLEEP_MODE_ACTIVE);
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

    initAPIs () {
        this.API_Light = new API_Light(this.socket);
        this.API_Light.build();
        this.API_Movement = new API_Movement(this.socket);
        this.API_Movement.build();
    }

    /**
     * Méthode temporaire pour simuler un pas
     */
    tmp () {
        let simulateMovementEl = document.getElementById('simulateMovement');
        simulateMovementEl.addEventListener('click', this.API_Movement.onMovementReceived.bind(this.API_Movement));
    }

};