import io from "socket.io-client";
import { MapRelief as MapReliefModel } from './Race/MapRelief'
import { MapCourse as MapCourseModel } from './Race/MapCourse'
import { Gauge as GaugeModel } from './Race/Gauge'
import { SleepMode as SleepModeModel } from './SleepMode/SleepMode'
import { Script as ScriptModel } from './Script/Script'
import { UnitsBuilder } from './Utils/UnitsBuilder'
import { API_Light } from "../api/API_Ligth";
import { API_Movement } from "../api/API_Movement";
import { Intro as IntroModel } from './Intro/Intro';
import { Race as RaceModel } from "./Race/Race";
import { Ids, ClassNames } from "../../datas/dom";
import { ViewHandler } from './Utils/ViewHandler';
import RaceScriptConfig_01 from '../../datas/race-script-01';
import { Canvas as CanvasModel } from './Particules/Canvas';
import { TweenMax } from 'gsap';
import { Timer } from "./Race/Timer";


export class App {

    constructor () {
        this.socket = io();
    }

    /**
     * Initialise l'application
     */
    init () {
        ViewHandler.show(Ids.VIEWS.START);
        this.initScript(RaceScriptConfig_01);
        this.initMapRelief();
        this.initGauge();
        this.initSleepMode();
        this.initAPIs();
        this.initIntro();
        this.initRace();
        this.initTimer();
        this.tmp();
        this.initCanvas();
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
        this.MapRelief = new MapReliefModel(document.getElementById(Ids.RACE.MAP_RELIEF), this.Script);
        this.MapRelief.load();
        this.MapRelief.build();
        this.MapCourse = new MapCourseModel(document.getElementById(Ids.RACE.MAP_COURSE), this.Script);
        this.MapCourse.build();
        this.MapCourse.setRunner(this.Script.User);
        this.Script.Bots.forEach(Bot => this.MapCourse.setRunner(Bot));
    }

    initGauge () {
        this.Gauge = new GaugeModel(document.getElementById(Ids.RACE.GAUGE), this.Script);
        this.Gauge.build();
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

    initIntro() {
        this.Intro = new IntroModel();
    }

    initRace () {
        this.Race = new RaceModel(this.Script, this.MapCourse);
        this.Race.waitStart();
    }

    initTimer () {
        this.Timer = new Timer(document.getElementById(Ids.RACE.TIMER), this.Script);
        this.Timer.init();
    }

    // Initialise le background
    initCanvas() {
        this.Canvas = new CanvasModel('canvas');
        this.Canvas.build(481);
    }

    /**
     * Méthode temporaire pour simuler un pas
     */
    tmp () {
        let simulateMovementEl = document.getElementById('simulateMovement');
        simulateMovementEl.addEventListener('click', this.API_Movement.onMovementReceived.bind(this.API_Movement));
    }

};
