import { Bus } from "../../events/Bus";

export class InstructionBuilder {

    constructor (elPrimary, elSecondary) {
        this.elPrimary = elPrimary;
        this.elSecondary = elSecondary;
        this.Bus = new Bus();
        this.Bus.listen(this.Bus.types.ON_PURPOSE_PASS, this.onPurposePass.bind(this));
        this.Bus.listen(this.Bus.types.ON_DISABLE_PURPOSE_PASS, this.onDisablePurposePass.bind(this));
        this.Indications = [];
    }

    showHtml (html, type) {
        switch (type) {
            case 'primary' : {
                this.show(this.elPrimary, html);
                break;
            }
            case 'secondary' : {
                this.show(this.elSecondary, html);
                break;
            }
        }
    }

    show (el, html) {
        el.innerHTML = html;
        el.style.display = "block";
    }

    hide (el) {
        el.style.display = "none";
        el.innerHTML = "";
    }

    onPurposePass (params) {
        this.Indications[params.keyFlag] = new IndicationPurposePass(2000);
        this.Indications[params.keyFlag].enable();
    }

    onDisablePurposePass (params) {
        delete this.Indications[params.keyFlag];
        this.Indications[params.keyFlag].disable();
    }

}

class IndicationPurposePass {

    constructor (time) {
        this.time = time;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    enable () {
        document.addEventListener('mousedown', this.onKeyDown);
        document.addEventListener('mouseup', this.onKeyUp);
    }

    disable () {
        document.removeEventListener('mousedown', this.onKeyDown);
        document.removeEventListener('mouseup', this.onKeyUp);
    }

    onKeyDown () {
        document.getElementById('nextViewTime').classList.add('nextView--active');
    }

    onKeyUp () {
        document.getElementById('nextViewTime').classList.add('nextView--active');
    }

}