import { Sort } from './../Utils/Sort'
import { Point as PointModel } from './Point'
import { Bot as BotModel } from "./Runners/Bot";
import { User as UserModel } from "./Runners/User";
import { Race as RaceModel } from './Race'
import { UnitsBuilder } from "../Utils/UnitsBuilder";

export class Script {

    constructor (config) {
        this.UnitsBuilder = new UnitsBuilder();
        this.Points = this.initPoints(config.map);
        this.Bots = this.initBots(config.bots);
        this.User = new UserModel(this, 0);
        this.Race = new RaceModel();
        this.distanceInterval = Sort.getInterval(this.Points, 'distance.value');
        this.altitudeInterval = Sort.getInterval(this.Points, 'altitude.value');
        this.multiplyRatio = config.base.multiplyRatio;
        this.currentPoint = this.Points[0];
    }

    initPoints (map) {
        return Object.keys(map).map(distance => new PointModel(map[distance], distance, this));
    }

    initBots (bots) {
        return bots.map(bot => new BotModel(bot, this, 0));
    }

    start () {

    }

}