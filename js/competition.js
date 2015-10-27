function Competition() {

  var startTime = null;
  var endTime = null;

  var times = [];

  this.startTimer = startTimer;
  this.stopTimer = stopTimer;
  this.addTime = addTime;
  this.loadTimes = loadTimes;
  this.printTimes = printTimes;

  function startTimer(size) {
    if(Game.debug)
      console.log("Started timer");
    this.startTime = (new Date()).getTime();
  }

  function stopTimer(size) {
    time = (new Date()).getTime() - this.startTime;
    if(Game.debug){
      console.log("It took you " + time + "ms to solve a " + size);
    }
    addTime(time, size);
  }

  function addTime(time, size) {
    times.push(new PuzzleTimer(size, time));
    localStorage["competition-times"] = JSON.stringify(times);
  }

  function loadTimes() {
    times = JSON.parse(localStorage["competition-times"]);
    console.log("Times loaded");
    this.printTimes();
  }

  function printTimes() {
    console.log(times);
    times.forEach(function(e, i) {
      console.log("Time " + i + ": " + e.time + "ms on a " + e.puzzleSize + " board");
    });
  }
}

function PuzzleTimer(size, stoppedTime) {
  var time,
      puzzleSize,
      datetime;

  this.puzzleSize = size;
  this.time = stoppedTime;
  this.datetime = Date.now();
}
