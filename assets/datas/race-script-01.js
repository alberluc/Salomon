import base from './base-script'
import { Maps } from './FileMaps'

export default {
    base,
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
    bots: [
        {
            name: "",
            color: "red",
            speed: 700
        },
        {
            name: "",
            color: "green",
            speed: 700
        },
        {
            name: "",
            color: "blue",
            speed: 700
        }
    ]
}