console.log("%c handleCrop.js", "color: #bada55");

export class HandleCrop {
    constructor() {
    }

    generateImage(croppie) {
        try {
        //the crop action
            if(!croppie) throw "no croppie";
            
                croppie.result({
                type: 'blob', 			// base64 | html | blob | rawcanvas
                size: 'viewport', 		// viewport | original | {width, height}
                // circle: true, 		// circle, square
                format: 'webp', 		// jpeg | png | webp
				quality: 1, 			// 0 til 1 
            }).then((imageResult) => {

				console.log(imageResult);

                let formData = new FormData();
                formData.append('base64_img', imageResult);

                console.log(formData); 
                
                fetch('http://localhost/kontrollpanel/index.php/sell/catalog/products-v2/images/add?_token=B-UYMG2PF4D8ErVsU73FdDLgWqlLGSK9kStIgp8AGVY', {

                method: 'POST',
                body: formData
                }).then(response => response.json()).then((data) => {
					console.log(data);
                });

			});
        } catch(error) {
            console.error(error);
        }
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
