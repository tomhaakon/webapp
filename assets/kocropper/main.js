import { Config } from './config.js';
import { HandleCrop } from './handleCrop';
import { CroppieManager } from './croppie-manager.js';
import { ImageInfo } from './showImageInfo.js';

const config = new Config();
const handleCrop = new HandleCrop();
const croppieManager = new CroppieManager('croppieMount');

const dataCropButtons = document.querySelector("[data-crop-buttons]");
const imageDataContainer = document.querySelector("[data-file-info]");

document.addEventListener("DOMContentLoaded", function() {
    console.log(`%c croppie-test.js loaded.`, 'color: #bada55');

        inputFile.addEventListener('change', () => {
            const file = inputFile.files[0];
            const reader = new FileReader();
                
            if(!file) return;

            reader.onloadend = async (event) => {
                const result = event.target.result;
				console.log(result);
                await croppieManager.initCroppie(400,400,400,400);

                await croppieManager.bindImage(result);
                
                const porportions = await croppieManager.readPorportions(result);

                const imageInfo = new ImageInfo(file, porportions); 

                const dataStore = Object.entries(imageInfo.data);

                imageDataContainer.innerHTML = ''; 
                imageDataContainer.innerHTML += `<b>Original image</b>`;

                for (const [key, value] of dataStore) {
                    imageDataContainer.innerHTML += `
                     <div>${key}: ${value}</div>   
                    `;
               }
                actions.style.display = '';
                listenForChange();
            }
                reader.readAsDataURL(file);
        });

    const cropAction = dataCropButtons.querySelector('[data-crop="execute"]');
    cropAction.addEventListener('click', () => {
        console.log("crop image");
        handleCrop.generateImage(croppieManager.croppieInstance);
    });


}); //end of DOMContentLoaded

function listenForChange() {

    const cropSmall = dataCropButtons.querySelector('[data-crop="small"]');
    const cropMedium = dataCropButtons.querySelector('[data-crop="medium"]');
    const cropLarge = dataCropButtons.querySelector('[data-crop="large"]');
    

    cropSmall.addEventListener('click', () => {
        croppieManager.changeViewportSize(100,100,100,100);
    });
    cropMedium.addEventListener('click', () => {
        croppieManager.changeViewportSize(400,400,400,400);
    });
    cropLarge.addEventListener('click', () => {
        croppieManager.changeViewportSize(800,800,800,800);
    });
    
}
