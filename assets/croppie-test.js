import Croppie from 'croppie';

document.addEventListener("DOMContentLoaded", function() {
    console.log(`%c croppie-test.js loaded.`, 'color: #bada55');

    if(Croppie === undefined) return console.error("Cannot find Croppie");
    
    let croppie = null;
    let croppeMount = document.getElementById('croppie-mount');


    function cleanUpCroppie() {
        croppieMount.innerHTML = '';
        croppieMount.classList.remove('croppie-container');

        croppie = null;
    }


    // Bind croppie to the image
    inputFile.addEventListener('change', () => {
        
      cleanUpCroppie();
      const file = inputFile.files[0];
      const reader = new FileReader();

      console.log(`selected file:`, file); 
      console.log(reader);

      reader.onloadend = function(event) {
          console.log("onloadend");
          const data = event.target.result;
          console.log(data); 
            croppie = new Croppie(croppieMount, {
                url: data,
                viewport: { 
                    width: 100, 
                    height: 100,
 //                   type: 'circle'
                },
                boundary: { 
                    width: 100, 
                    height: 100
                },

//            enableResize: true,
            mouseWheelZoom: false,
           // enableOrientation: true,
           // mouseWheelZoom: 'ctrl'
            });


            console.log(croppie); 
            croppie.bind(data);

           actions.style.display = '';
        }
        reader.readAsDataURL(file);
    });

        cropBtn.addEventListener('click', () => {

            croppie.result({
                type: 'base64',
//                circle: true,
                format: 'jepg',
                size: 'viewport'
            }).then((imageResult) => {

                let formData = new FormData();
                formData.append('base64_img', imageResult);
//
//                fetch('upload_cropped.php', {
//                    method: 'POST',
//                    body: formData
//                }).then(response => response.json()).then((data) => {
//                    console.log(data);
//                });
            });
        });
    //
    //
    //end of DOMContentLoaded
});
