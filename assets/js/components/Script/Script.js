import { Sort } from './../Utils/Sort'
import { Point as PointModel } from './Point'
import { Flag as FlagModel } from "./Flag";
import { Bot as BotModel } from "./Runners/Bot";
import { User as UserModel } from "./Runners/User";
import { UnitsBuilder } from "../Utils/UnitsBuilder";

export class Script {

    constructor (config) {
        this.UnitsBuilder = new UnitsBuilder();
        this.Points = this.initPoints(config.map);
        this.Bots = this.initBots(config.bots);
        this.User = new UserModel(config.user, this, 0);
        console.log(this.Points)
        this.distanceInterval = Sort.getInterval(this.Points, 'distance.value');
        this.altitudeInterval = Sort.getInterval(this.Points, 'altitude.value');
        this.multiplyRatio = config.multiplyRatio;
        this.mapCourse = config.mapCourse;
        this.gauge = this.initGauge(config.base.gauge);
        this.currentPoint = this.Points[0];
        console.log(this.currentPoint);
    }

    initPoints (map) {
        return Object.keys(map).map(distance => new PointModel(map[distance], distance, this));
    }

    initBots (bots) {
        return bots.map(bot => new BotModel(bot, this, 0));
    }

    initGauge (gaugeBase) {
        let Levels = Object.keys(gaugeBase.levels).map(value => (
            {
                Flag: new FlagModel(gaugeBase.levels[value].flag),
                type: gaugeBase.levels[value].type,
                value
            }
        ));
        return {
            Levels
        }
    }

}