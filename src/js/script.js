var ImgRotator = {
    angle:parseInt(45),
    image:{},
    src:"",
    canvasID:"",
    intervalMS:parseInt(500),
    jump:parseInt(5),
    start_action:function(canvasID, imgSrc, interval, jumgAngle){
        ImgRotator.jump = jumgAngle;
        ImgRotator.intervalMS = interval;
        ImgRotator.canvasID = canvasID;
        ImgRotator.src = imgSrc ;
        var image = new Image();
        var canvas = document.getElementById(ImgRotator.canvasID);
        image.onload = function() {
            ImgRotator.image = image;
            canvas.height = canvas.width = Math.sqrt( image.width* image.width+image.height*image.height);
            window.setInterval(ImgRotator.keepRotating,ImgRotator.intervalMS);
            //theApp.keepRotating();
        };
        image.src = ImgRotator.src;   
    },
    keepRotating:function(){
        ImgRotator.angle+=ImgRotator.jump;
        var canvas = document.getElementById(ImgRotator.canvasID);
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(ImgRotator.angle*Math.PI/180); 
        ctx.drawImage(ImgRotator.image, -ImgRotator.image.width/2,-ImgRotator.image.height/2);
        ctx.restore();
    }
}


