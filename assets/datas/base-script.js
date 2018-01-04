export default {
    units: [
        {
            label: 'mètres',
            ratio: 0.001,
            key: 'm',
        },
        {
            label: 'kilomètres',
            ratio: 1,
            key: 'km',
        }
    ],
    gauge: {
        levels: {
            25: {
                type: 'less-than',
                wait: 22,
                flag: {
                    key: 'DH',
                    dispatch: 'onDehydration'
                }
            },
            75: {
                type: 'greater-than',
                wait: 78,
                flag: {
                    key: 'SH',
                    dispatch: 'onOverhydration'
                }
            }
        }
    }
}