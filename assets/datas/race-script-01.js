import base from './base-script'
import { Maps } from './FileMaps'
import { Events } from "../js/events/Events";

export default {
    base,
    multiplyRatio: 0.008,
    danger: {
        numberOfClick: 3,
        clickValue: 5,
    },
    distance: {
        interval: ['0km', '32km'],
        ratio: 100
    },
    altitude: {
        interval: ['1250km', '1423km'],
        ratio: 1
    },
    mapCourse: {
        src: Maps.MapCourse_1
    },
    mapRelief: {
        src: Maps.MapCourse_2
    },
    countDown: {
      time: 3
    },
    timer: {
        duration: 10
    },
    indicators: {
        time: {
          ratio: 100
        }
    },
    map: {
        0: {
            gauge: {
                level: 65
            },
            altitude: '1330km',
            ratioMove: 0.95
        },
        25: {
            altitude: '1350km',
            ratioMove: 0.8
        },
        45: {
            gauge: {
                level: 25,
                goto: 50
            },
            flag: {
                key: 'UDH',
                type: Events.ON_USER_DEHYDRATION
            }
        },
        46: {
            altitude: '1410km',
            ratioMove: 1
        },
        60: {
            altitude: '1423km',
            ratioMove: 1.2,
        },
        75: {
            altitude: '1390km',
            ratioMove: 1.2,
        },
        80: {
            gauge: {
                level: 30,
                goto: 76
            },
            flag: {
                key: 'UOH',
                type: Events.ON_USER_OVERHYDRATION
            }
        },
        100: {
            gauge: {
                level: 40
            },
            altitude: '1350km'
        }
    },
    user: {
        name: 'user',
        size: 7,
        color: 'red',
        speed: 500,
        ratioOnDanger: 0.2
    },
    bots: [
        {
            name: 'bot1',
            color: 'green',
            size: 3,
            speed: 275,
            ratioOnDanger: 0.3
        },
        {
            name: 'bot2',
            color: 'green',
            size: 3,
            speed: 240,
            ratioOnDanger: 0.3
        },
        {
            name: 'bot3',
            color: 'green',
            size: 3,
            speed: 210,
            ratioOnDanger: 0.3
        }
    ]
}