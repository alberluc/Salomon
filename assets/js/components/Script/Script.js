import { Sort } from './../Utils/Sort'
import { Point as PointModel } from './Point'
import { Flag as FlagModel } from "./Flag";
import { Bot as BotModel } from "./Runners/Bot";
import { User as UserModel } from "./Runners/User";
import { UnitsBuilder } from "../Utils/UnitsBuilder";
import { Bus } from "../../events/Bus";
import {Audios} from "../../../datas/Medias";

export class Script {

    /**
     * Initialise le script en fonction d'un configuration passée en paramètre
     * @param config
     */
    constructor (config) {
        this.self = config;
        this.UnitsBuilder = new UnitsBuilder();
        this.Bus = new Bus();
        this.Points = this.initPoints(config.map);
        this.Bots = this.initBots(config.bots);
        this.User = new UserModel(config.user, this, 0);
        this.multiplyRatio = config.multiplyRatio;
        this.mapCourse = config.mapCourse;
        this.danger = config.danger;
        this.timer = config.timer;
        this.countDown = config.countDown;
        this.indicators = config.indicators;
        this.gauge = this.initGauge(config.base.gauge);
        this.Flags = this.searchFlag([], config);
        this.Flags.forEach(Flag => this.Bus.addFlag(Flag));
        this.currentPoint = this.Points[0];
        this.PointsFlags = Sort.exists(this.Points, 'Flag');
        this.Bus.listen(this.Bus.types.ON_CHANGE_CURRENT_POINT, this.onChangeCurrentPoint.bind(this))
    }

    /**
     * Initialise les points de la map
     * @param map
     * @returns {Array}
     */
    initPoints (map) {
        return Object.keys(map).map((distance, index) => new PointModel(map[distance], distance, index));
    }

    /**
     * Initialise les Bots
     * @param bots
     */
    initBots (bots) {
        return bots.map(bot => new BotModel(bot, this, 0));
    }

    /**
     * Initialise la jauge
     * @param gaugeBase
     * @returns {{Levels: Array}}
     */
    initGauge (gaugeBase) {
        let Levels = Object.keys(gaugeBase.levels).map(value => (
            {
                Flag: typeof gaugeBase.levels[value].flag !== "undefined" ? new FlagModel(gaugeBase.levels[value].flag) : null,
                type: gaugeBase.levels[value].type || value,
                show: Number.isInteger(parseFloat(value)),
                value
            }
        ));
        return {
            Levels
        }
    }

    /**
     * Se déclenche lorque le joueur passe d'un point à un autre
     * @param params
     */
    onChangeCurrentPoint (params) {
        this.PointsFlags.forEach(PointFlag => {
            if (PointFlag.id === params.id) {
                PointFlag.Flag.dispatch();
            }
        })
    }

    searchFlag (arr, objs) {
        Object.keys(objs).forEach(obj => {
            if (obj === "flag") {
                arr.push(objs[obj]);
            }
            if (Array.isArray(objs[obj]) || typeof objs[obj] === "object") {
                return this.searchFlag(arr, objs[obj]);
            }
        });
        return arr;
    }

}