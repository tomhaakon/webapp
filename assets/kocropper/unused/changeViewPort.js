console.log("%c changeViewPort.js loaded", "color: #bada55");


export class ChangeViewPort {
    constructor(viewport) {
        this.height = viewport.height;
        this.width = viewport.width;
    }
    
    toSmall() {
        return this.callBack();
    }

    toMedium() {
        this.height = 400,
        this.width = 400

        return this.callBack();
    }

    toLarge() {
        this.height = 800,
        this.width = 800

        return this.callBack();
    }

    callBack() {
        return {
            height: this.height,
            width: this.width
        }
    }
}
