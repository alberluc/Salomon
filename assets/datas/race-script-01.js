import base from './base-script'
import { Maps } from './FileMaps'

export default {
    base,
    multiplyRatio: 0.008,
    distance: ['0km', '32km'],
    altitude: ['1100km', '1423km'],
    mapCourse: {
        src: Maps.MapCourse_1
    },
    gauge: {
        ratio: 1
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
        60: {
            altitude: '1423km',
            ratioMove: 1.3,
            flag: {
                key: 'test_flag_key',
                dispatch: 'test_flag_dispatch'
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