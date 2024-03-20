console.log("%c config.js loaded", "color: #bada55");

export class Config {

    constructor() {
        
        this.upload = {
            data: {

                name: null,
                url: null,
                type: null,
                size: null,
                height: null,
                width: null

            }
        },

        this.croppieOptions = {

            boundary: {                 //default container size

                width: 800,
                height: 800

            },

            enableExif: false,          //default false
            enableOrientation: false,   //default false
            enableResize: false,        //default false
            enableZoom: true,           //default true
            enforceBoundary: true,      //default true
            mouseWheelZoom: true,      //defualt true
            customClass: '',            //default ''
            showZoomer: true,           //default true

            viewport: {

                width: 200,
                height: 200,
                type: 'square'          //default 'square'

            }, 
        }
    }

};

