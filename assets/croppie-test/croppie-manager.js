console.log("%c croppie-manager.js loaded", "color: #bada55");
import Croppie from 'croppie';

export class CroppieManager {
    
    constructor(elementId) {
        this.elementId = elementId;
        this. croppieInstance = null;

        this.lastImageUrl = null;
        this.lastZoom = 0;
        this.lastPoints = null; 

        if(Croppie === undefined) return console.error("Cannot find Croppie");
    }

    async initCroppie(viewportWidth, viewportHeight, boundaryWidth, boundaryHeight) {
        if(this.croppieInstance && this.lastImageUrl) {
            const result = await this.croppieInstance.get();

            this.lastZoom = result.zoom;
            this.lastPoints = result.points;
        }

        this.destroyInstance();
        const element = document.getElementById(this.elementId);
        this.croppieInstance = new Croppie(element, {
            viewport: {
                width: viewportWidth,
                height: viewportHeight,
                type: 'square'
            },
            boundary: {
                width: boundaryWidth, 
                height: boundaryHeight 
            },
        });
        if(this.lastImageUrl) {
            await this.croppieInstance.bind({
                url: this.lastImageUrl,
                points: this.lastPoints,
                zoom: this.lastPoints
            });
        }
    }

    destroyInstance() {
        if(this.croppieInstance) {
            this.croppieInstance.destroy();
            this.croppieInstance = null; 
        }
    }
    
    changeViewportSize(newWidth, newHeight, viewBoundaryWidth, viewBoundaryHeight) {
        if(this.croppieInstance) {
            this.initCroppie(newWidth, newHeight, viewBoundaryHeight, viewBoundaryHeight).then(() => {
            });
        }
    }
    async bindImage(imageUrl) {
        this.lastImageUrl = imageUrl;
        if(this.croppieInstance) {
            await this.croppieInstance.bind({
                url: imageUrl
            });
        }
    }
}
            
