import base from './base-script'
import navigation from './navigation'
import { Audios, Maps } from './Medias'
import { Events } from "../js/events/Events"

export default {
    base,
    navigation,
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
      time: 1
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
            /*flag: {
                  audios: {
                      play: [
                          {
                              src: Audios.ENV.CLAPPING,
                              options: {
                                  volume: {
                                      from: 0,
                                      to: 1,
                                      duration: 5
                                  },
                                  onStart: 'onSoundStart',
                                  onFinish: 'onSoundFinish'
                              }
                          }
                      ]
                  }
            },*/
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
        size: 13,
        color: 'test',
        speed: 500,
        ratioOnDanger: 0.2,
        strokeWidth: '1',
        strokeColor: 'white',
    },
    bots: [
        {
            name: 'bot1',
            color: 'transparent',
            size: 5,
            speed: 275,
            ratioOnDanger: 0.3,
            strokeWidth: '1',
            strokeColor: 'white',
        },
        {
            name: 'bot2',
            color: 'transparent',
            size: 5,
            speed: 240,
            ratioOnDanger: 0.3,
            strokeWidth: '1',
            strokeColor: 'white',
        },
        {
            name: 'bot3',
            color: 'transparent',
            size: 5,
            speed: 210,
            ratioOnDanger: 0.3,
            strokeWidth: '1',
            strokeColor: 'white',
        }
    ]
}