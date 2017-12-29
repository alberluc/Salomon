import { Sort } from './../Utils/Sort'
import { Point as PointModel } from './Point'
import { Bot as BotModel } from "./Runners/Bot";
import { User as UserModel } from "./Runners/User";
import { Race as RaceModel } from './Race'
import { Bus } from '../../events/Bus';

export class Script {

    constructor (config, UnitsBuilder) {
        this.UnitsBuilder = UnitsBuilder;
        this.Points = this.initPoints(config.map);
        this.Bots = this.initBots(config.bots);
        this.User = new UserModel(this, this.UnitsBuilder, 0);
        this.Race = new RaceModel();
        this.distanceInterval = Sort.getInterval(this.Points, 'distance.value');
        this.altitudeInterval = Sort.getInterval(this.Points, 'altitude.value');
        this.multiplyRatio = config.base.multiplyRatio;
        this.currentPoint = this.Points[0];
        this.Bus = new Bus();
        this.Bus.dispatch(this.Bus.types.ON_USER_MOVE);
    }

    initPoints (map) {
        return Object.keys(map).map(distance => new PointModel(map[distance], distance, this.UnitsBuilder));
    }

    initBots (bots) {
        return bots.map(bot => new BotModel(bot));
    }

}