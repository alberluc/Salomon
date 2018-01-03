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
    map: {
        0: {
            altitude: '1330km',
            ratioMove: 1.1
        },
        50: {
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
        name: '',
        size: 15,
        color: "red",
        speed: 500
    },
    bots: [
        {
            name: "",
            color: "green",
            size: 7,
            speed: 475
        },
        {
            name: "",
            color: "green",
            size: 7,
            speed: 440
        },
        {
            name: "",
            color: "green",
            size: 7,
            speed: 410
        }
    ]
}