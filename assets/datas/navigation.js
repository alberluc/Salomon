import { Ids } from './dom'
import { Audios } from './Medias'

export default [
    {
        id: Ids.VIEWS.START,
        appear: {
            flag: {
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