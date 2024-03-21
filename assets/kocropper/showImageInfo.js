console.log("%c imageInfo.js loaded.", "color: #bada55");

export class ImageInfo {
    constructor(inputFile, porportions) {
        this.inputFile = inputFile;
        this.porportions = porportions;

        this.data = {
            name: this.inputFile.name,
            size: this.inputFile.size,
            height: this.porportions.height,
            width: this.porportions.width,
            type: this.inputFile.type,
        }
    }
    data() {
        return this.data;        
    }
}
