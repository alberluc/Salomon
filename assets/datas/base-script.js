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
                type: 'less-than',
                wait: 22,
                flag: {
                    key: 'DH',
                    type: Events.ON_DEHYDRATION
                }
            },
            75: {
                type: 'greater-than',
                wait: 78,
                flag: {
                    key: 'SH',
                    type: Events.ON_OVERHYDRATION
                }
            }
        }
    }
}