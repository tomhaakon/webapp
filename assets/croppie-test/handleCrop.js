console.log("%c handleCrop.js", "color: #bada55");

export class HandleCrop {
    constructor() {
    }

    generateImage(croppie) {
        //the crop action
            console.log("crop image");
                croppie.result({
                type: 'rawcanvas',
                // circle: true,
                format: 'jepg',
                size: 'viewport'
            }).then((imageResult) => {

                let formData = new FormData();
                formData.append('base64_img', imageResult);
                console.log("ajax req"); 
                //
                //fetch('upload_cropped.php', {
                //method: 'POST',
                //body: formData
                //}).then(response => response.json()).then((data) => {
                //console.log(data);
                //});

        });
    }

    previewCroppedImage(croppie) {
        try {
            croppie.result({
                type: 'rawcanvas',
                //format: 'webp',
                size: 'viewport'
            }).then(function(html) {
                console.log(html);
                const element = document.querySelector("[image-cropped]");
                //                element.append(html);
            });
        }
        catch(error) {
           console.error(error);
       }
    }
}
