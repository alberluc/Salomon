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
import {
    Time as TimeIndicator,
    Distance as DistanceIndicator,
    DifferenceAltitude as DAltitudeIndicator,
    Gauge as GaugeIndicator,
    Position as PositionIndicator
} from "./Race/Indicators";


export class App {

    constructor () {
        this.socket = io();
    }

    /**
     * Initialise l'application
     */
    init () {
        ViewHandler.show(Ids.VIEWS.PLAY);
        this.initScript(RaceScriptConfig_01);
        this.initMaps();
        this.initGauge();
        this.initSleepMode();
        this.initAPIs();
        this.initIntro();
        this.initRace();
        this.initTimer();
        this.initCanvas();
        this.initIndicators();
        this.tmp();
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
    initMaps () {
        this.MapRelief = new MapReliefModel(document.getElementById(Ids.RACE.MAP_RELIEF), this.Script);
        this.MapCourse = new MapCourseModel(document.getElementById(Ids.RACE.MAP_COURSE), this.Script);
    }

    initGauge () {
        this.Gauge = new GaugeModel(document.getElementById(Ids.RACE.GAUGE), this.Script);
        this.Gauge.build();
    }

    /**
     * Initialise le mode veille
     */
    initSleepMode () {
        let SleepMode = new SleepModeModel(this.Script.self.base.durationBeforeSleep, document.body, ClassNames.SLEEP_MODE_ACTIVE);
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
        this.Race = new RaceModel(this.Script, {
            onStart: this.onRaceStart.bind(this),
            onFinish: this.onRaceFinish.bind(this)
        });
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

    initIndicators () {
        this.TimeIndicator= new TimeIndicator(document.getElementById(Ids.RACE.INDICATOR.TIME), this.Script.indicators.time);
        this.DistanceIndicator= new DistanceIndicator(document.getElementById(Ids.RACE.INDICATOR.DISTANCE));
        this.DAltitudeIndicator= new DAltitudeIndicator(document.getElementById(Ids.RACE.INDICATOR.DIFFERENCE_ALITITUDE));
        this.GaugeIndicator= new GaugeIndicator(document.getElementById(Ids.RACE.INDICATOR.GAUGE));
        this.PositionIndicator = new PositionIndicator(document.getElementById(Ids.RACE.INDICATOR.POSITION), this.Script.User, this.MapRelief);
    }

    onRaceStart () {
        this.TimeIndicator.active();
        this.DistanceIndicator.active();
        this.DAltitudeIndicator.active();
        this.GaugeIndicator.active();
        this.PositionIndicator.active();
        this.MapRelief.start();
        this.MapCourse.start();
    }

    /**
     * Méthode temporaire pour simuler un pas
     */
    tmp () {
        let simulateMovementEl = document.getElementById('simulateMovement');
        simulateMovementEl.addEventListener('click', this.API_Movement.onMovementReceived.bind(this.API_Movement));
    }

    onRaceFinish() {
        this.TimeIndicator.disable();
        this.DistanceIndicator.disable();
        this.DAltitudeIndicator.disable();
        this.GaugeIndicator.disable();
        this.PositionIndicator.disable();
    }

};
