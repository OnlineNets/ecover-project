import Perspective from 'perspectivejs';
import { loadImage, createCanvas } from 'canvas';

const getPerspectiveImage = async (imageData, ifMug, start_height, start, end, height, transform, mugTransform) => {
  try {
    const image = await getTransformedImage(imageData, start, end, start_height, height, transform);
    
    if (!transform.perTransform.length) {
      console.log("No transform");
      return image;
    }

    const perImage = await getPerTransformedImage(transform, image);
    if(ifMug){
      const mugImage = await getMugImage(mugTransform, perImage);
      return mugImage;
    }else{
      return perImage;
    }
  } catch (error) {
    console.error(error);
    // Handle any errors that may occur during image transformation
    throw error; // Rethrow the error to propagate it
  }
};

const getTransformedImage = (imageData, start, end, start_height, height, transform) => {
  const img = new Image();
 
  return new Promise((resolve, reject) => {
    img.onload = function() {
      try{
        const canvas = document.createElement('canvas');
        canvas.width = transform.layerWidth;
        canvas.height = transform.layerHeight;
        const context = canvas.getContext('2d');
        context.drawImage(
          img,
          start,
          start_height,
          end - start,
          height,
          0,
          0,
          transform.layerWidth,
          transform.layerHeight
        );
        const transformedImage = canvas.toDataURL('image/png');
        resolve(transformedImage);
      }catch(err){
        console.log(err);
        resolve(imageData);
      }
    };

    img.src = imageData;
  });
};

const getPerTransformedImage = (transform, image) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    let transformedImage;

    img.onload = function () {
      try {

        const { perTransform } = transform;

        let xmin = 30000, xmax = 0,
          ymin = 30000, ymax =0;
        perTransform.map((value, index) => {
          if (index % 2 === 0) {
            if (value < xmin) xmin = value;
            if (value > xmax) xmax = value;
          } else {
            if (value < ymin) ymin = value;
            if (value > ymax) ymax = value;
          }
        });

        let canvas1 = document.createElement("canvas");
        canvas1.width = xmax - xmin;
        canvas1.height = ymax - ymin;
        const ctx = canvas1.getContext("2d");

        const p = new Perspective(ctx, img);
    

        p.draw([
          [perTransform[0] - xmin, perTransform[1] - ymin],
          [perTransform[2] - xmin, perTransform[3] - ymin],
          [perTransform[4] - xmin, perTransform[5] - ymin],
          [perTransform[6] - xmin, perTransform[7] - ymin],
        ]);

        transformedImage = canvas1.toDataURL("image/png");
        resolve(transformedImage); // Resolve the promise with the transformed image
      } catch (err) {
        console.log(err);
        transformedImage = image;
        resolve(transformedImage); // Resolve the promise with the original image
      }
    };

    img.src = image;
  });
}

const getMugImage = (mugTransform, image) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const w = mugTransform.width, h = mugTransform.height;

    let canvas1 = document.createElement("canvas");
    let transformedImage;
    canvas1.width = w;
    canvas1.height = h;

    img.onload = function () {
      try {
        const ctx = canvas1.getContext("2d");
        ctx.clearRect(0, 0, w, h);

        var iw = w;
        var ih = h;

        var xOffset = mugTransform.xOffset,
            yOffset = mugTransform.yOffset;

        var a = mugTransform.aRadius;
        var b = mugTransform.bRadius;

        //var scaleFactor = iw / (2*a); //how many times original image is greater compared to our rendering area?
        var scaleFactor = mugTransform.scaleFactor;
        var parameterY = mugTransform.parameterY;

        // draw vertical slices
        for (var X = 0; X < iw; X+=1) {
          var y = b/a * Math.sqrt(a*a - (X-a)*(X-a)); // ellipsis equation
          ctx.drawImage(img, X * scaleFactor, 0, 6, ih, X + xOffset, y + yOffset, 1, ih - parameterY + y/2);
        }
        //ctx.drawImage(image, 0, 0, transform.layerWidth, transform.layerHeight);

        transformedImage = canvas1.toDataURL("image/png");
        resolve(transformedImage); // Resolve the promise with the transformed image
      } catch (err) {
        console.log(err);
        transformedImage = image;
        resolve(transformedImage); // Resolve the promise with the original image
      }
    };

    img.src = image;
  });
}

// Function to convert base64 to buffer
// function base64ToBuffer(base64Data) {
//     const binaryString = window.atob(base64Data);
//     const buffer = new Uint8Array(binaryString.length);
  
//     for (let i = 0; i < binaryString.length; i++) {
//       buffer[i] = binaryString.charCodeAt(i);
//     }
  
//     return buffer;
// }

export default getPerspectiveImage;