import { Bus } from "../../events/Bus";
import { Ids } from "../../../datas/dom";

export class InstructionBuilder {

    constructor (elPrimary, elSecondary) {
        this.elPrimary = elPrimary;
        this.elSecondary = elSecondary;
        this.Bus = new Bus();
        this.IndicationPurposePass = new IndicationPurposePass(document.getElementById(Ids.INDICATIONS.LONG_PASS), 2000);
        this.Bus.listen(this.Bus.types.ON_PURPOSE_PASS, this.onPurposePass.bind(this));
        this.Bus.listen(this.Bus.types.ON_DISABLE_PURPOSE_PASS, this.onDisablePurposePass.bind(this));
    }

    onPurposePass () {
        this.IndicationPurposePass.enable();
    }

    onDisablePurposePass () {
        this.IndicationPurposePass.disable();
    }

}

class IndicationPurposePass {

    constructor (el, time) {
        this.el = el;
        this.time = time;
        this.Bus = new Bus();
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.watcher = null;
        this.disable();
    }

    enable () {
        this.el.style.display = "flex";
        document.addEventListener('mousedown', this.onKeyDown);
        document.addEventListener('mouseup', this.onKeyUp);
    }

    disable () {
        this.el.style.display = "none";
        document.removeEventListener('mousedown', this.onKeyDown);
        document.removeEventListener('mouseup', this.onKeyUp);
    }

    onKeyDown () {
        this.watch(new Date());
        document.getElementById('nextViewTime').classList.add('nextView--active');
    }

    onKeyUp () {
        document.getElementById('nextViewTime').classList.remove('nextView--active');
        cancelAnimationFrame(this.watcher);
    }

    watch (DateStart) {
        let currDate = new Date();
        let time = currDate.getTime() - DateStart.getTime();
        if (time > this.time) { this.active(); }
        else this.watcher = requestAnimationFrame(this.watch.bind(this, DateStart));
    }

    active () {
        this.Bus.dispatch(this.Bus.types.ON_PASS_VOICE);
        cancelAnimationFrame(this.watcher);
        this.disable();
    }
}