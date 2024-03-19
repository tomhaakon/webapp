import Croppie from 'croppie';

import Config from './Config.js';
import BoxControl from './BoxControl';
import ShowImageInfo from './ShowImageInfo.js';
import HandleCrop from './HandleCrop';
import { ChangeViewPort } from './ChangeViewPort.js';

const config = new Config;
const handleCrop = new HandleCrop();

document.addEventListener("DOMContentLoaded", function() {
    console.log(`%c croppie-test.js loaded.`, 'color: #bada55');

    if(Croppie === undefined) return console.error("Cannot find Croppie");

    let croppieMount = document.getElementById('croppieMount');
    let croppie = null;


    function cleanUpCroppie() {
        croppieMount.innerHTML = '';
        croppieMount.classList.remove('croppie-container');
        croppie = null;
    }


        // bind croppie to the image
        inputFile.addEventListener('change', () => {
            cleanUpCroppie();
            const file = inputFile.files[0];
            const reader = new FileReader();
                
            reader.onloadend = async function(event) {
                let dimensions; 

                try {

                    dimensions = await getImageHeightAndWidth(event.target.result);

                    config.upload.data  = {
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        width: dimensions.width,
                        height: dimensions.height,
                        url: event.target.result,
                    };

                    if(config.upload.data.width < 200) {
                        //minimums bildeformat
                        console.log("lite bilde");
                    }

                    
                } catch (error) {
                    console.log(error);
                }

                //config.croppieOptions.viewport.width = 500;
                //
                //const changeViewPort = new ChangeViewPort(config.croppieOptions.viewport);
                const viewport = config.croppieOptions.viewport;
                const changeViewPort = new ChangeViewPort(viewport);
                
                //changeViewPort.toSmall();
                //changeViewPort.toMedium();
                changeViewPort.toLarge(); 

                config.croppieOptions.viewport = {
                    width: changeViewPort.width,
                    height: changeViewPort.height
                };

                croppie = new Croppie(croppieMount, config.croppieOptions);

                croppie.bind(config.upload.data.url);
                actions.style.display = '';
                
                new ShowImageInfo(config.upload);

            }

            reader.readAsDataURL(file);
            
        });
        cropBtn.addEventListener('click', () => {
            handleCrop.previewCroppedImage(croppie);
        });
}); //end of DOMContentLoaded

const getImageHeightAndWidth = async (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = function() {
            resolve({
                width: img.width,
                height: img.height
            }); 
        };

        img.onerror = function() {
            reject(new Error("Failed to get image data."));
        };

        img.src = src;

    });
}
