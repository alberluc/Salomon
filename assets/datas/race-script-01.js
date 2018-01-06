import base from './base-script'
import { Maps } from './FileMaps'

export default {
    base,
    multiplyRatio: 0.008,
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
    map: {
        0: {
            altitude: '1330km',
            ratioMove: 1.2
        },
        25: {
            altitude: '1350km',
            ratioMove: 1.1
        },
        55: {
            gauge: {
                level: 24
            },
            flags: {
                key: 'UDH',
                dispatch: 'onUserDehydration'
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
            flags: {
                key: 'UOH',
                dispatch: 'onUserOverhydration'
            }
        },
        100: {
            altitude: '1286km'
        }
    },
    user: {
        name: 'user',
        size: 15,
        color: 'red',
        speed: 500
    },
    bots: [
        {
            name: 'bot1',
            color: 'green',
            size: 7,
            speed: 275
        },
        {
            name: 'bot2',
            color: 'green',
            size: 7,
            speed: 240
        },
        {
            name: 'bot3',
            color: 'green',
            size: 7,
            speed: 210
        }
    ]
}