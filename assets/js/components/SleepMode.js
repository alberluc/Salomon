export class SleepModeModel {

    constructor (durationBeforeSleep, elementChangeStateOnSleepMode, classNameSleepMode) {
        this.durationBeforeSleep = durationBeforeSleep;
        this.watcher = null;
        this.isActive = false;
        this.elementChangeStateOnSleepMode = elementChangeStateOnSleepMode;
        this.classNameSleepMode = classNameSleepMode;
    }

    watch (listeners) {
        this.listeners = listeners;
        this.listeners.forEach(listener => { this.setWatcher(listener) });
        this.startWatcher();
    }

    setWatcher (listener) {
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
        this.isActive = true;
        this.elementChangeStateOnSleepMode.classList.add(this.classNameSleepMode);
    }

    disableSleepMode () {
        this.isActive = false;
        this.elementChangeStateOnSleepMode.classList.remove(this.classNameSleepMode);
    }

};