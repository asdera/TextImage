var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');

var image;

var slit1 = "@&$#%8HZ0OXYwzaoxv!=+:~-  "
var slit2 = ["@","&","$","#","%","8","H","Z","0","O","X","Y","z-","a-","o-","x-","v-","!- ","=-","+-",":- ","~-","-- ","  ","  ","  ","  "]
var slit3 = "@@@###XXX///===;;;:::---  "
var slit4 = "@&$#%8E3HZ0OUXYmw><==++/    "
var slit5 = ["&","&","&","&","&","&","&","&","--","--","--","--","--","--","--","--","   ","   ","   ","   ","   ","   ","   ","   ","   ","   "]
var slit6 = ["&","&","&","&","&","&","&","&","   ","   ","   ","   ","   ","   ","   ","   ","   ","   ","   ","   ","   ","   ","   ","   ","   ","   "]
var slit6 = ["&","&","&","&","&","&","&","&","&","&","&","&","&","&","&","&","&","&","&","&","&","&","&","&","   ","   "]
var disk = true
// var slit5 = "@&$#%8HZ0OXYwzaoxv!=+:~-  ".split("").concat(["&$2000", "&$2000"])

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.src = event.target.result;
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
            activate(ctx, canvas);  
        }
        image = img;
    }
    reader.readAsDataURL(e.target.files[0]);   
}

function activate(context, canvas) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    size = Number($("#number").val())
    w = Math.floor(2.5 * size * canvas.width / canvas.height)
    h = Math.floor(size)
    $("textarea").attr("rows", h*3+5).attr("cols", w*3+20).val(textify(imgData, w, h))
}

function textValue(gray) {
    text = slit1
    return text[Math.floor(gray/10)]
}

function textify(imgData, w, h) {
    pixels = imgData.data
    width = imgData.width
    height = imgData.height
    blockWidth = width / w;
    blockHeight = height / h;

    str = "";

    i = 0;
    for (var n = 0; n < h; n++) {
        for (var m = 0; m < w; m++) {
            j = Math.floor(i)
            var gray = (pixels[j] * .3 + pixels[j+1] * .59 + pixels[j+2] * .11) * pixels[j+2] / 255;
            str += textValue(gray);
            i += blockWidth * 4;
        }
        str += "\n" + (disk ? "/" : "")
        i = Math.floor(n * blockHeight) * width * 4;
    }
    return str;
}
