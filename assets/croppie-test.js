import Croppie from 'croppie';

let upload = {
    data: {
        name: null,
        url: null,
        type: null,
        size: null,
        height: null,
        width: null
    }
};

let croppieOptions = {
    url: upload.data.url,
    viewport: { 
        width: 200, 
        height: 200,
        //type: 'circle'
    },
    boundary: { 
        width: 100, 
        height: 100
    },
    // enableresize: true,
    mousewheelzoom: false,
    // enableorientation: true,
    // mousewheelzoom: 'ctrl'
};

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
                
            console.warn(`selected file:`, file); 
            
            //first populate of upload object
            upload.data  = {
                name: file.name,
                type: file.type,
                size: file.size
            };

            reader.onloadend = async function(event) {
                let dimensions; 

                //get image height and width
                try {

                    dimensions = await getImageHeightAndWidth(event.target.result);
                    upload.data.width = dimensions.width;
                    upload.data.height = dimensions.height;

                } catch (error) {
                    console.log(error);
                }

                //populate the upload object
                upload.data.url  = event.target.result;

                croppie = new Croppie(croppieMount, croppieOptions);
                croppie.bind(upload.data.url);

                //show actions after reader has loaded
                actions.style.display = '';

                // for debug info 
                document.getElementById('fileInfo').innerHTML =
                "uploaded file: " + upload.data.name + "<br>" +
                "uploaded file type: " + upload.data.type + "<br>" +
                "uploaded file size: " + upload.data.size + " kB<br>" + 
                "uploaded file width: " + upload.data.width + "<br>" +
                "uploaded file height: " + upload.data.height + "<br>";
            }


            reader.readAsDataURL(file);
            
        });

            //the crop action
            cropBtn.addEventListener('click', () => {

                croppie.result({
                    type: 'base64',
                    // circle: true,
                    format: 'jepg',
                    size: 'viewport'
                }).then((imageResult) => {

                    let formData = new FormData();
                    formData.append('base64_img', imageResult);
                    //
                    //fetch('upload_cropped.php', {
                    //method: 'POST',
                    //body: formData
                    //}).then(response => response.json()).then((data) => {
                    //console.log(data);
                    //});
                });
            });
    
//end of DOMContentLoaded
});

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
