import { Ids } from './dom'
import { Audios } from './Medias'
import { Events } from "../js/events/Events";

export default [
    {
        id: Ids.VIEWS.RACE,
        appear: {
            flag: {
                types: Events.ON_PURPOSE_PASS_VOICE,
                audios: {
                    play: [
                        {
                            src: Audios.ENV.CLAPPING1,
                            options: {
                                volume: {
                                    from: 0,
                                    to: 1,
                                    duration: 5
                                },
                                onFinish: {
                                    flag: {
                                        audios: {
                                            play: [
                                                {
                                                    src: Audios.ENV.SUPPORT,
                                                    options: {
                                                        volume: {
                                                            from: 1,
                                                            to: 0.7,
                                                        },
                                                    }
                                                }
                                            ],
                                            play: [
                                                {
                                                    src: Audios.ENV.SUPPORT,
                                                    options: {
                                                        volume: {
                                                            from: 1,
                                                            to: 0.7,
                                                        },
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
    },

    /* EXEMPLE {
        id: Ids.VIEWS.RACE,
        appear: {
            flag: {
                types: Events.ON_PURPOSE_PASS_VOICE,
                audios: {
                    play: [
                        {
                            src: Audios.ENV.CLAPPING1,
                            options: {
                                volume: {
                                    from: 0,
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
                                                            from: 0,
                                                            to: 1,
                                                            duration: 5
                                                        },
                                                        onFinish: {
                                                            flag: {
                                                                types: Events.ON_DISABLE_PURPOSE_PASS_VOICE
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
                                timeout: 1000,
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