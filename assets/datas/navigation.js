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
                                }
                            },
                            onFinish: () => { console.log('sound finish') }
                        }
                    ]
                }
            }
        }
        /*disappear: {
            flag: {
                key: '24',
                audios: {
                    stop: [
                        {
                            src: Audios.ENV.CLAPPING,
                            options: {
                                onStop: () => { console.log('sound stop') }
                            }
                        }
                    ]
                }
            }
        }*/
    }
]