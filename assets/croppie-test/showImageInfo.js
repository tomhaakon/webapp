console.log("%c imageInfo.js loaded.", "color: #bada55");

export class ImageInfo {
    constructor(inputFile, porportions) {
        this.inputFile = inputFile;
        this.porportions = porportions;

        this.data = {
            name: this.inputFile.name,
            size: this.inputFile.size,
            type: this.inputFile.type,
            width: this.porportions.width,
            height: this.porportions.height,
        }
    }
    show() {
        console.log(this.data);
    }
}
