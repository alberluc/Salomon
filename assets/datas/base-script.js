import { Events } from './../js/events/Events';
import { Audios } from "./Medias";

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
                    type: [ Events.ON_DEHYDRATION, Events.ON_USER_DEHYDRATION ],
                    audios: {
                        play: [
                            {
                                src: Audios.VOICE.DESHYDRATATION,
                                options: {
                                    volume: {
                                        from: 0,
                                        to: 1,
                                        duration: 5
                                    }
                                }
                            },
                            {
                                src: Audios.ENV.HEARTHIGHBEAT,
                                options: {
                                    volume: {
                                        from: 0,
                                        to: 1,
                                        duration: 5
                                    },
                                }
                            }
                        ],
                    }
                }
            },
            50: {},
            75: {
                value: 75,
                type: 'greater-than',
                flag: {
                    type: Events.ON_OVERHYDRATION,
                    audios: {
                        play: [
                            {
                                src: Audios.VOICE.HYPERHYDRATATION,
                                options: {
                                    volume: {
                                        from: 0,
                                        to: 1,
                                        duration: 5
                                    }
                                }
                            },
                            {
                                src: Audios.ENV.HEARTHIGHBEAT,
                                options: {
                                    volume: {
                                        from: 0,
                                        to: 1,
                                        duration: 5
                                    },
                                }
                            }
                        ],
                    }
                }
            },
            "default" : {
                flag: {
                    audios: {
                        stop: [ Audios.ENV.HEARTHIGHBEAT ]
                    }
                }
            }
        }
    },
    durationBeforeSleep: 300000
}