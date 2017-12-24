import base from './base-script'

export default {
    base,
    distance: '32km',
    hideAltitude: '1100km',
    map: {
        0: {
            altitude: '1330km'
        },
        50: {
            altitude: '1423km',
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