import { Events } from './../js/events/Events';

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
                value: 25,
                type: 'less-than',
                flag: {
                    key: 'DH',
                    type: Events.ON_DEHYDRATION
                }
            },
            50: {},
            75: {
                value: 75,
                type: 'greater-than',
                flag: {
                    key: 'SH',
                    type: Events.ON_OVERHYDRATION
                }
            }
        }
    },
    durationBeforeSleep: 25000
}