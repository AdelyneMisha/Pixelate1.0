//display image on upload

function displayImage() {
  
  var inputImage = document.getElementById("image_uploads").files[0];
  var img = document.createElement("img");
  img.src = URL.createObjectURL(inputImage);
  img.alt = "Selected Image";
  document.getElementById("preview").appendChild(img);
  draww(img.src);
}

document.getElementById("image_uploads").addEventListener("input", displayImage);

//load image on canvas
function draww(image){
  const ctx = document.getElementById("canvas").getContext("2d");
  const imgg = new Image();
  imgg.src = image;
  ctx.imageSmoothingEnabled = false;
  
  imgg.onload = function() {
    var canvasSizes = canvasSizer(imgg.height, imgg.width, 5);
    canvas.width = canvasSizes[1];
    canvas.height = canvasSizes[0];
    
    ctx.drawImage(imgg,0,0,canvasSizes[1],canvasSizes[0]);


    //getting pixel data from canvas
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    console.log(countColors(pixels));
  }
}

function countColors(pixels) {
  var colorsInPixelate = new Set();
  for (var i = 0; i < pixels.length; i += 4) {
    var rgba = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
    var colorKey = rgba.join(',');
    colorsInPixelate.add(colorKey);
  }
  return colorsInPixelate.size;
}


function canvasSizer(height, width,pixelsize){

  //how i transformed the blueberry image 
  //img size 1024 x 1024
  //made it 100 x 100 on canvas and then transformed it to 10 scale
  //so prolly need to make canvas size reduce by 10% and then transform it back to 10

  var sizes = [];
  sizes.push(height/pixelsize);
  sizes.push(width/pixelsize);
  return sizes;

  //note to adjust pixel size divide the required height and width by the pixel and size and then transform the scale back.

}
