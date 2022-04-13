dataset = ["mouse", "remote control", "cat", "clock", "line", "rain", "dog", " circle", "box", "square"];
random_number = Math.floor((Math.random()*dataset.length)+1);
sketch = dataset[random_number];
document.getElementById("random_sketch").innerHTML = "Sketch to be drawn : "+sketch;
timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
function update_canvas()
{
    background("white");
    random_number = Math.floor((Math.random()*dataset.length)+1);
sketch = dataset[random_number];
document.getElementById("random_sketch").innerHTML = "Sketch to be drawn : "+sketch;

}

function check_sketch() 
{
    timer_counter++;
    document.getElementById("timer").innerHTML = "Timer : "+timer_counter;
    console.log(timer_counter);
    if (timer_counter > 5000)
    {
        timer_counter = 0;
        timer_check = "Completed!";
    }
    if(timer_check == "Completed!" || answer_holder == "set")
    {
        timer_check = "";
        answer_holder = "";
        update_canvas();
    }
}


function preload()
{
classifier = ml5.imageClassifier("DoodleNet");

}

function setup()
{
canvas = createCanvas(500, 500);
canvas.center();
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}

function draw()
{
strokeWeight(10);
stroke("#000000");
if (mouseIsPressed)
{
    line(pmouseX, pmouseY, mouseX, mouseY);
}
check_sketch()
if(drawn_sketch == sketch)
{
    answer_holder = "set";
    score++;
    document.getElementById("score").innerHTML = "Score : " + score;
}
}

function clearCanvas()
{
    background("white");
}

function classifyCanvas()
{
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) 
{
    if (error)
    {
        console.error(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML = "Label: " + results[0].label;

    document.getElementById("confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + "%";

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}