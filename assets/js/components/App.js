import { MapReliefModel } from './Maps/MapRelief'
import { SleepMode as SleepModeModel } from './SleepMode/SleepMode'
import { Script as ScriptModel } from './Script/Script'
import { UnitsBuilder as UnitsBuilderModel } from './Utils/UnitsBuilder'
import { API } from "../api/API";
import { API_Light } from "../api/API_Ligth";
import { API_Movement } from "../api/API_Movement";
import io from "socket.io-client";
import RaceScriptConfig_01 from '../../datas/race-script-01'

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
    }

    /**
     * Initialise le script
     * @param script Script qui va définir le contexte de l'application
     */
    initScript (script) {
        this.UnitsBuilder = new UnitsBuilderModel(script.base.units, script.distance);
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

    initAPIs () {
        this.API_Light = new API(new API_Light(), this.socket);
        this.API_Light.build();
        this.API_Movement = new API(new API_Movement(), this.socket);
        this.API_Movement.build();
    }

};