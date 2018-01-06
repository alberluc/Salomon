import base from './base-script'
import { Maps } from './FileMaps'
import { Events } from "../js/events/Events";

export default {
    base,
    multiplyRatio: 0.016,
    danger: {
        numberOfClick: 3,
        clickValue: 10
    },
    distance: {
        interval: ['0km', '32km'],
        ratio: 100
    },
    altitude: {
        interval: ['1100km', '1423km'],
        ratio: 1
    },
    mapCourse: {
        src: Maps.MapCourse_1
    },
    mapRelief: {
        src: Maps.MapCourse_2
    },
    timer: {
        duration: 10
    },
    map: {
        0: {
            altitude: '1330km',
            ratioMove: 1.2
        },
        25: {
            altitude: '1350km',
            ratioMove: 1.1
        },
        45: {
            gauge: {
                level: 20
            },
            flag: {
                key: 'UDH',
                type: Events.ON_USER_DEHYDRATION
            }
        },
        60: {
            altitude: '1423km',
            ratioMove: 1.3,
        },
        80: {
            gauge: {
                level: 76
            },
            flag: {
                key: 'UOH',
                type: Events.ON_USER_OVERHYDRATION
            }
        },
        100: {
            altitude: '1286km'
        }
    },
    user: {
        name: 'user',
        size: 7,
        color: 'red',
        speed: 500,
        ratioOnDanger: 0.2
    },
    bots: [
        {
            name: 'bot1',
            color: 'green',
            size: 3,
            speed: 275,
            ratioOnDanger: 0.3
        },
        {
            name: 'bot2',
            color: 'green',
            size: 3,
            speed: 240,
            ratioOnDanger: 0.3
        },
        {
            name: 'bot3',
            color: 'green',
            size: 3,
            speed: 210,
            ratioOnDanger: 0.3
        }
    ]
}