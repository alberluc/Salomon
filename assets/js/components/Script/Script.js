import { Sort } from './../Utils/Sort'
import { Point as PointModel } from './Point'
import { Flag as FlagModel } from "./Flag";
import { Bot as BotModel } from "./Runners/Bot";
import { User as UserModel } from "./Runners/User";
import { UnitsBuilder } from "../Utils/UnitsBuilder";
import { Bus } from "../../events/Bus";

export class Script {

    constructor (config) {
        this.UnitsBuilder = new UnitsBuilder();
        this.Bus = new Bus();
        this.Points = this.initPoints(config.map);
        this.Bots = this.initBots(config.bots);
        this.User = new UserModel(config.user, this, 0);
        this.distanceInterval = Sort.getInterval(this.Points, 'distance.value');
        this.altitudeInterval = Sort.getInterval(this.Points, 'altitude.value');
        this.multiplyRatio = config.multiplyRatio;
        this.mapRelief = config.mapRelief;
        this.mapCourse = config.mapCourse;
        this.danger = config.danger;
        this.timer = config.timer;
        this.gauge = this.initGauge(config.base.gauge);
        this.currentPoint = this.Points[0];
        this.PointsFlags = Sort.exists(this.Points, 'Flag');

        this.Bus.listen(this.Bus.types.ON_CHANGE_CURRENT_POINT, this.onChangeCurrentPoint.bind(this))
    }

    initPoints (map) {
        return Object.keys(map).map((distance, index) => new PointModel(map[distance], distance, index));
    }

    initBots (bots) {
        return bots.map(bot => new BotModel(bot, this, 0));
    }

    initGauge (gaugeBase) {
        let Levels = Object.keys(gaugeBase.levels).map(value => (
            {
                Flag: typeof gaugeBase.levels[value].flag !== "undefined" ? new FlagModel(gaugeBase.levels[value].flag) : null,
                type: gaugeBase.levels[value].type || null,
                value
            }
        ));
        return {
            Levels
        }
    }

    onChangeCurrentPoint (e) {
        this.PointsFlags.forEach(PointFlag => {
            if (PointFlag.id === e.detail.id) {
                PointFlag.Flag.dispatch();
            }
        })
    }

}