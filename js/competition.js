function Competition() {

  var startTime = null;
  var endTime = null;

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
    switch (size) {
      case 4:
        $("#promod #four ol").append("<li>" + time + "ms</li>");
        times.four.times.push(new PuzzleTimer(size, time));
        break;
      case 6:
        $("#promod #six ol").append("<li>" + time + "ms</li>");
        times.six.times.push(new PuzzleTimer(size, time));
        break;
      case 8:
        $("#promod #eight ol").append("<li>" + time + "ms</li>");
        times.eight.times.push(new PuzzleTimer(size, time));
        break;
      case 10:
        $("#promod #ten ol").append("<li>" + time + "ms</li>");
        times.ten.times.push(new PuzzleTimer(size, time));
        break;
    }

    localStorage["promod"] = JSON.stringify(times);
    updateTimes();
  }

  function updateTimes() {
    modes = [ times.four, 
              times.six, 
              times.eight, 
              times.ten ]

    modes.forEach(function(e){
      if(e.times.length >= 5) {
        e.currentAo5 = averageOf(e.times.slice(-5));
        if(e.bestAo5 == -1 || e.currentAo5 < e.bestAo5)
          e.bestAo5 = e.currentAo5;
        if(e.times.length >= 12) {
          e.currentAo12 = averageOf(e.times.slice(-12));
          if(e.bestAo12 == -1 || e.currentAo12 < e.bestAo12) 
            e.bestAo12 = e.currentAo12;
        }
      }
    });

    // current
    $("#promod #four .currentAvg5").text(times.four.currentAo5 + "ms");
    $("#promod #six .currentAvg5").text(times.six.currentAo5 + "ms");
    $("#promod #eight .currentAvg5").text(times.eight.currentAo5 + "ms");
    $("#promod #ten .currentAvg5").text(times.ten.currentAo5 + "ms");

    $("#promod #four .currentAvg12").text(times.four.currentAo12 + "ms");
    $("#promod #six .currentAvg12").text(times.six.currentAo12 + "ms");
    $("#promod #eight .currentAvg12").text(times.eight.currentAo12 + "ms");
    $("#promod #ten .currentAvg12").text(times.ten.currentAo12 + "ms");

    // best
    $("#promod #four .bestAvg5").text(times.four.bestAo5 + "ms");
    $("#promod #six .bestAvg5").text(times.six.bestAo5 + "ms");
    $("#promod #eight .bestAvg5").text(times.eight.bestAo5 + "ms");
    $("#promod #ten .bestAvg5").text(times.ten.bestAo5 + "ms");

    $("#promod #four .bestAvg12").text(times.four.bestAo12 + "ms");
    $("#promod #six .bestAvg12").text(times.six.bestAo12 + "ms");
    $("#promod #eight .bestAvg12").text(times.eight.bestAo12 + "ms");
    $("#promod #ten .bestAvg12").text(times.ten.bestAo12 + "ms");

    localStorage["promod"] = JSON.stringify(times);
  }

  function loadTimes() {
    if (localStorage["promod"]) {
      times = JSON.parse(localStorage["promod"]);
      if (Game.debug)
        console.log("Times loaded from localstorage");

      updateTimes();
      this.printTimes();
    } else {
      times = { four:     new TimeList(),
                six:      new TimeList(),
                eight:    new TimeList(),
                ten:      new TimeList()
      };
      if (Game.debug)
        console.log("no existing times");
    }

  }

  function printTimes() {
    times.four.times.forEach(function(e, i) {
      $("#promod #four ol").append("<li>" + e.time + "ms</li>");
    });

    times.six.times.forEach(function(e, i) {
      $("#promod #six ol").append("<li>" + e.time + "ms</li>");
    });

    times.eight.times.forEach(function(e, i) {
      $("#promod #eight ol").append("<li>" + e.time + "ms</li>");
    });

    times.ten.times.forEach(function(e, i) {
      $("#promod #ten ol").append("<li>" + e.time + "ms</li>");
    });
  }

  function msToTime(s) {
    function addZero(n) {
      return (n<10 ? '0':'') + n;
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    console.log(s);

    var string = mins==0 ? addZero(mins) : '';
    string += secs==0 ? addZero(min) : '';
    string += ms==0 ? addZero(ms) : '';
    return string;

  }

  function averageOf(stack) {
    var sum = 0;
    var avg = 0;

    // make cubing-style averages by removing fastest
    // and slowest time
    stack.sort(function(a,b){return a-b;});
    stack.slice(1, -1);


    stack.forEach(function(e){
      sum += e.time;
    });

    avg = sum / stack.length;

    return avg;
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

function TimeList(size) {
  var currentAo5;
  var currentAo12;
  var bestAo5 = -1;
  var bestAo12 = -1;

  this.times = [];
}
