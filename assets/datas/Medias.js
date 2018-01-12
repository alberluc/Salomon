import MapCourse_1 from './../img/course_2.svg'
import MapCourse_2 from './../img/MapRelief.svg'
import ArrowSVG from "../img/arrow.svg"
import CheckpointSVG from "../img/Checkpoint.svg"

export const Maps = {
    MapCourse_1: MapCourse_1,
    MapCourse_2: MapCourse_2,
};

export const Image = {
    Arrow: ArrowSVG,
    Checkpoint: CheckpointSVG
};

const SRC_AUDIOS = '../sound/';

export const Audios = {
    VOICE: {

    },
    ENV: {
        SUPPORT: SRC_AUDIOS + 'support.wav',
        EXPLICATION : SRC_AUDIOS + 'tuto.wav',
        DESHYDRATATION : SRC_AUDIOS + 'deshydratation.wav',
        HYPERHYDRATATION : SRC_AUDIOS + 'hyperhydratation.wav',
        TIMER: SRC_AUDIOS + 'timer.wav',
        CLAPPING: SRC_AUDIOS + '2.wav',
        CLAPPING1: SRC_AUDIOS + '3.wav',
        HEARTHIGHBEAT: SRC_AUDIOS + 'heartHighBeat.wav',
        ENDRACE: SRC_AUDIOS + 'endExplication.wav',
        THANK: SRC_AUDIOS + 'end.wav',
    }
};
