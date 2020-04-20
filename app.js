/*eslint-env browser */

var startTime, timeOut,
SPACE_CODE = 32,
E_CODE = 101,
THOUSAND = 1000;
let circle,
times,
result,
arrayOfTimes = [];

function init(){
    let startButton = document.querySelector(".button");
    startButton.addEventListener("click", startExperiment);
    document.addEventListener("keypress", onKeyPressed);
    result = document.getElementById("results");
    times = document.getElementById("times");
}

function startExperiment(){
    resetTest();
    timeOut = setTimeout(changeColor, getRandomTime());
}

function getRandomTime(){
    var min = 3,
    max = 10,
    rand = Math.floor(Math.random() * (max - min + 1) + min);
    return rand * THOUSAND;
}

function changeColor(){
    circle = document.getElementById("circle");
    circle.style.background = "orange";
    startTime = new Date(); 
}

function onKeyPressed(e){
    var neededTime;
    if(e.keyCode === SPACE_CODE){
        let endtime = new Date();
        neededTime = endtime - startTime;
        arrayOfTimes.push(neededTime);
        result.classList.remove("hidden");
        result.innerHTML = neededTime + "ms";
        resetBackground();
        timeOut = setTimeout(changeColor, getRandomTime());
    }
    if(e.keyCode === E_CODE){
        result.innerHTML = "Mittelwert: " + countMean() + "ms";
        resetBackground();
        clearTimeout(timeOut);
        showResults();
    }
    
}

function countMean(){
    var i, mean = 0;
    for(i = 0; i < arrayOfTimes.length; i++){
        mean += parseInt(arrayOfTimes[i], 10);  
    }
    mean /= arrayOfTimes.length;
    return mean;
}

function resetTest(){
    arrayOfTimes = [];
    times.innerHTML = "";
    result.classList.add("hidden");
}

function resetBackground(){
    circle.style.background = "#0D5047";
}

function showResults(){
    let finalTimes = "", i;
    for (i = 0; i < arrayOfTimes.length; i++){
        if(i === arrayOfTimes.length - 1){
            finalTimes += arrayOfTimes[i] + "ms";
        }else{
        finalTimes += arrayOfTimes[i] + "ms, ";}
    }
    times.innerHTML = "gemessene Zeiten: " + finalTimes;
    saveToCsv();
    arrayOfTimes = [];
}

function saveToCsv(){
	var encodedUri, link;
	let csvContent = "data:text/csv;charset=utf-8,milli seconds\n";
	arrayOfTimes.forEach(function (infoArray) {
		let row = infoArray + ",";
        csvContent += row + "\r\n";
    });
	encodedUri = encodeURI(csvContent);
	
	link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "results.csv");
	document.body.appendChild(link);
	link.click();
}

init();