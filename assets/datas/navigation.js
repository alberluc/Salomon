import { Ids } from './dom'
import { Audios } from './Medias'
import { Events } from "../js/events/Events";

export default [
    {
        id: Ids.VIEWS.START,
        appear: {
            flag: {
                types: Events.ON_PURPOSE_PASS_VOICE,
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
                            },
                        }
                    ]
                }
            }
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
                                onStop: () => { console.log('sound stop') }
                            }
                        }
                    ]
                }
            }
        }
    }
]