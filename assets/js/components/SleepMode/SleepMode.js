import {ViewHandler} from "../Utils/ViewHandler";
import {Ids} from "../../../datas/dom";

export class SleepMode {

    /**
     * Constructeur du mode veille
     * @param durationBeforeSleep Durée de non-activité avant le déclenchement du mode veille
     * @param elementChangeStateOnSleepMode Element qui change d'état en mode veille
     * @param classNameSleepMode Nom de la classe qui va être attribuée lors du changement d'état de l'élément passé en paramètre
     */
    constructor (durationBeforeSleep, elementChangeStateOnSleepMode, classNameSleepMode) {
        this.durationBeforeSleep = durationBeforeSleep;
        this.elementChangeStateOnSleepMode = elementChangeStateOnSleepMode;
        this.classNameSleepMode = classNameSleepMode;
        this.watcher = null;
        this.isActive = false;
        this.isStopped = false;
    }

    /**
     * Active le mode veille
     * @param listeners array Evénements écoutés pour définir si le client est actif ou non
     */
    watch (listeners) {
        this.listeners = listeners;
        this.listeners.forEach(listener => { this.setWatcherListener(listener) });
        this.startWatcher();
    }

    setWatcherListener (listener) {
        listener.target.addEventListener(listener.event, this.onClientSignal.bind(this))
    }

    startWatcher () {
        this.watcher = setTimeout(() => { this.enableSleepMode() }, this.durationBeforeSleep);
    }

    resetWatcher () {
        clearTimeout(this.watcher);
    }

    restartWatcher () {
        this.resetWatcher();
        this.startWatcher();
    }

    onClientSignal () {
        if (this.isActive) this.disableSleepMode();
        this.restartWatcher();
    }

    enableSleepMode () {
        if (!this.isStopped) {
            ViewHandler.show(Ids.VIEWS.SLEEP);
            this.isActive = true;
            this.elementChangeStateOnSleepMode.classList.add(this.classNameSleepMode);
        }
    }

    disableSleepMode () {
        window.location = "/";
        this.isActive = false;
        this.elementChangeStateOnSleepMode.classList.remove(this.classNameSleepMode);
    }

    persistStop () {
        this.isStopped = true;
    }

};