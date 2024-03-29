import io from "socket.io-client";
import { MapRelief as MapReliefModel } from './Race/MapRelief'
import { MapCourse as MapCourseModel } from './Race/MapCourse'
import RaceScriptConfig_01 from '../../datas/race-script-01';
import { Navigation } from "./Script/Navigation";
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
import { Canvas } from './Particules/Canvas';
import { TweenMax } from 'gsap';
import { Timer } from "./Race/Timer";
import { Bus } from "../events/Bus";
import { Events } from "../events/Events";
import {
Time as TimeIndicator,
Distance as DistanceIndicator,
DifferenceAltitude as DAltitudeIndicator,
Gauge as GaugeIndicator,
Position as PositionIndicator
} from "./Race/Indicators";
import { InstructionBuilder } from "./Utils/InstructionBuilder";
import { Transition } from './Transition/Transition';



export class App {

    constructor () {
        this.socket = io();
        this.Bus = new Bus();
        this.InstructionBuilder = new InstructionBuilder(document.getElementById(Ids.INDICATIONS));
    }

    /**
     * Initialise l'application
     */
    init () {
        ViewHandler.show(Ids.VIEWS.PLAY);
        this.initScript(RaceScriptConfig_01);
        this.initNavigation(RaceScriptConfig_01.navigation);
        this.initMaps();
        this.initGauge();
        this.initSleepMode();
        this.initAPIs();
        this.initIntro();
        this.initRace();
        this.initTimer();
        this.initCanvas();
        this.initIndicators();
        this.initOpactiy();
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

    initNavigation(navigation) {
        this.Navigation = new Navigation(navigation);
        this.Navigation.init();
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
            }, {
                target: this.Bus.el,
                event: Events.ON_USER_PLACEMENT
            }, {
                target: this.Bus.el,
                event: Events.ON_USER_MOVE_RECEIVED
            }
        ]);
        //SleepMode.persistStop();
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
            onFinish: this.onRaceFinish.bind(this),
            onViewAppear: this.onRaceViewAppear.bind(this)
        });
        this.Race.waitStart();
    }

    initTimer () {
        this.Timer = new Timer(document.getElementById(Ids.RACE.TIMER), this.Script);
        this.Timer.init();
    }

    // Initialise le background
    initCanvas() {
        this.Canvas = new Canvas('canvas');
    }

    initIndicators () {
        this.TimeIndicator= new TimeIndicator(document.getElementById(Ids.RACE.INDICATOR.TIME), this.Script.indicators.time);
        this.DistanceIndicator= new DistanceIndicator(document.getElementById(Ids.RACE.INDICATOR.DISTANCE));
        this.DAltitudeIndicator= new DAltitudeIndicator(document.getElementById(Ids.RACE.INDICATOR.DIFFERENCE_ALITITUDE));
        this.GaugeIndicator= new GaugeIndicator(document.getElementById(Ids.RACE.INDICATOR.GAUGE));
        this.PositionIndicator = new PositionIndicator(document.getElementById(Ids.RACE.INDICATOR.POSITION), this.Script.User, this.MapRelief);
    }

    initOpactiy() {
        this.transitionOpacity = new Transition();
        this.transitionOpacity.init()
    }

    onRaceStart () {
        this.TimeIndicator.active();
        this.DistanceIndicator.active();
        this.DAltitudeIndicator.active();
        this.GaugeIndicator.active();
        this.PositionIndicator.active();
    }

    /**
     * Méthode temporaire pour simuler un pas
     */
    tmp () {
        /*let simulateMovementEl = document.getElementById('simulateMovement');
        simulateMovementEl.style.display = "block";
        simulateMovementEl.addEventListener('click', this.API_Movement.onMovementReceived.bind(this.API_Movement));*/
        document.addEventListener('keydown', (function (e) {
            if (e.keyCode === 37 || e.keyCode === 39) {
                this.API_Movement.onMovementReceived();
            }
        }).bind(this));
    }

    onRaceFinish() {
        this.TimeIndicator.disable();
        this.DistanceIndicator.disable();
        this.DAltitudeIndicator.disable();
        this.GaugeIndicator.disable();
        this.PositionIndicator.disable();
    }

    onRaceViewAppear () {
        this.MapRelief.start();
        this.MapCourse.start();
    }

}
