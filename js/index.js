wheelDraw();
var input = document.getElementById("inputs");
var spin_button = document.getElementById("spin");

// Update changes in real time
input.addEventListener("input", function(event) {
    var numInputs = parseInt(event.target.value);
    
    if (!isNaN(numInputs)){
        event.preventDefault();
        wheelDraw();
    }
});

// Spin the wheel
var lastRotationAngle = 0;

spin_button.addEventListener("click", function(){
    var canvas = document.getElementById("wheel");
    
    
    var angle = Math.abs(Math.random())*360+1800+lastRotationAngle;
    canvas.style.transform = 'rotate('+angle+'deg)';
    lastRotationAngle = angle;

    var nbr_inputs = parseInt(document.getElementById("inputs").value) || 3;
    var numSectors = 2 * nbr_inputs;
    var sectorSize = 360 / numSectors;
    var sectorIndex = Math.floor(lastRotationAngle / sectorSize);
    setTimeout(function(){
        var resultText = getResultText(sectorIndex);
        var result = document.getElementById("result");

        result.textContent = resultText;
    },300);
});

// Find the result of spinning
function getResultText(sectorIndex) {
    var texts = ["Yes", "No"]; 
    if(texts[sectorIndex % 2] == "Yes"){
        return "No";
    }
    else{
        return "Yes";
    }
}

// Draw the wheel
function wheelDraw(){
    var nbr_inputs = document.getElementById("inputs").value;
    var c = document.getElementById("wheel");
    var ctx = c.getContext("2d");
    if(nbr_inputs == ""){
        nbr_inputs = 3;
    }
    var centerX = 101;
    var centerY = 101;
    var radius = 100;
    var numSpokes = 2 * nbr_inputs;
    var colors = ["rgb(190, 159, 225)", "rgb(201, 182, 228)", "rgb(225, 204, 236)", "rgb(241, 241, 246)"];

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();

    var angleStep = (2 * Math.PI) / numSpokes;
    for (var i = 0; i < numSpokes; i++) {
        var startAngle = angleStep * i;
        var endAngle = angleStep * (i + 1);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        j = i;
        while(!colors[j]){
            j = j-3;
        }
        ctx.fillStyle = colors[j];
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
        ctx.stroke();

        var textAngle = (startAngle + endAngle) / 2;
        var textRadius = radius * 0.7;
        var textX = centerX + Math.cos(textAngle) * textRadius;
        var textY = centerY + Math.sin(textAngle) * textRadius;

        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ((i%2 == 0)?text = "Yes":text = "No");
        ctx.fillText(text, textX, textY);
    }
}