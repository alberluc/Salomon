import { Ids } from './dom'
import { Audios } from './Medias'
import { Events } from "../js/events/Events";
import { Keys as FlagKeys } from "./Flags";

export default [
    {
        id: Ids.VIEWS.RACE,
        appear: {
            flag: {
                key: FlagKeys.RACE_VIEW_APPEAR,
                timeout: 2000,
                type: [ Events.ON_PURPOSE_PASS, Events.ON_PRESENTATION_MAP_COURSE ],
                skip: {
                    listen: Events.ON_PASS_VOICE,
                    active: FlagKeys.PRESENTATION_FINISH,
                    flag: {
                        audios: {
                            stop: [
                                { src: Audios.VOICE.PRESENTATION_ELEMENT.OFF1 },
                                { src: Audios.VOICE.PRESENTATION_ELEMENT.OFF2 },
                                { src: Audios.VOICE.PRESENTATION_ELEMENT.OFF3 },
                                { src: Audios.VOICE.PRESENTATION_ELEMENT.OFF4 },
                                { src: Audios.VOICE.PRESENTATION_ELEMENT.OFF5 }
                            ]
                        }
                    }
                },
                audios: {
                    play: [
                        {
                            src: Audios.VOICE.PRESENTATION_ELEMENT.OFF1,
                            options: {
                                volume: { from: 1, to: 1, duration: 0.2 },
                                onFinish: {
                                    flag: {
                                        audios: {
                                            play: [
                                                {
                                                    src: Audios.VOICE.PRESENTATION_ELEMENT.OFF2,
                                                    options: {
                                                        volume: { from: 1, to: 1, duration: 0.2 },
                                                        onFinish: {
                                                            flag: {
                                                                type: Events.ON_PRESENTATION_MAP_RELIEF,
                                                                audios: {
                                                                    play: [
                                                                        {
                                                                            src: Audios.VOICE.PRESENTATION_ELEMENT.OFF3,
                                                                            options: {
                                                                                volume: { from: 1, to: 1, duration: 0.2 },
                                                                                onFinish: {
                                                                                    flag: {
                                                                                        type: Events.ON_PRESENTATION_GAUGE,
                                                                                        audios: {
                                                                                            play: [
                                                                                                {
                                                                                                    src: Audios.VOICE.PRESENTATION_ELEMENT.OFF4,
                                                                                                    options: {
                                                                                                        volume: { from: 1, to: 1, duration: 0.2 },
                                                                                                        onFinish: {
                                                                                                            flag: {
                                                                                                                type: [ Events.ON_PRESENTATION_FINISH, Events.ON_DISABLE_PURPOSE_PASS ],
                                                                                                                key: FlagKeys.PRESENTATION_FINISH,
                                                                                                                audios: {
                                                                                                                    play: [
                                                                                                                        {
                                                                                                                            src: Audios.ENV.CHRONO,
                                                                                                                            options: {
                                                                                                                                volume: {
                                                                                                                                    from: 0,
                                                                                                                                    to: 1,
                                                                                                                                    duration: 5
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            },
        }
    },

    /* EXEMPLE {
        id: Ids.VIEWS.RACE,
        appear: {
            flag: {
                types: Events.ON_PURPOSE_PASS,
                audios: {
                    play: [
                        {
                            src: Audios.ENV.CLAPPING1,
                            options: {
                                volume: {
                                    from: 1,
                                    to: 1,
                                    duration: 5
                                },
                                onFinish: {
                                    flag: {
                                        audios: {
                                            play: [
                                                {
                                                    src: Audios.ENV.CLAPPING1,
                                                    options: {
                                                        volume: {
                                                            from: 1,
                                                            to: 1,
                                                            duration: 5
                                                        },
                                                        onFinish: {
                                                            flag: {
                                                                types: Events.ON_DISABLE_PURPOSE_PASS
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            },

        },
        disappear: {
            flag: {
                key: '24',
                audios: {
                    stop: [
                        {
                            src: Audios.ENV.CLAPPING,
                            options: {
                                timeout: 0.20,
                                onStop: () => {
                                    console.log('sound stop')
                                }
                            }
                        }
                    ]
                }
            }
        }
    },*/

]