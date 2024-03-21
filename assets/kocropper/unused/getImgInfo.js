console.log("%c getImgInfo.js loaded", "color: #bada55");

export class GetImgInfo {

    async getData(src) {
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
}
