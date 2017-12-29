import base from './base-script'

export default {
    base,
    distance: '32km',
    hideAltitude: '1100km',
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