import base from './base-script'

export default {
    base,
    distance: '32km',
    hideAltitude: '1100km',
    map: {
        0: {
            altitude: '1330km',
            ratioMoveRunner: 1.1
        },
        50: {
            altitude: '1423km',
            ratioMoveRunner: 1.3,
            flag: {
                key: 'test_flag_key',
                dispatch: 'test_flag_dispatch'
            }
        },
        100: {
            altitude: '1286km'
        }
    }
}