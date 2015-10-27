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
    if (Game.debug)
      console.log(size);

    switch (size) {
      case 4:
        $("#promod #four ol").append("<li>" + time + "ms</li>");
        times.four.push(new PuzzleTimer(size, time));
        break;
      case 6:
        $("#promod #six ol").append("<li>" + time + "ms</li>");
        times.six.push(new PuzzleTimer(size, time));
        break;
      case 8:
        $("#promod #eight ol").append("<li>" + time + "ms</li>");
        times.eight.push(new PuzzleTimer(size, time));
        break;
      case 10:
        $("#promod #ten ol").append("<li>" + time + "ms</li>");
        times.ten.push(new PuzzleTimer(size, time));
        break;
    }

    localStorage["promod"] = JSON.stringify(times);
    updateTimes();
  }

  function updateTimes() {
    if(averageOf(times.four.slice(-5)) > times.fourAo5) {
      times.fourAo5 = averageOf(times.four.slice(-5)); 
    }
    $("#promod #four .avg5").text(times.fourAo5 + "ms");

    $("#promod #six .avg5").text(averageOf(times.four.slice(-5)) + "ms");
    $("#promod #eight .avg5").text(averageOf(times.four.slice(-5)) + "ms");
    $("#promod #ten .avg5").text(averageOf(times.four.slice(-5)) + "ms");

    $("#promod #four .avg12").text(averageOf(times.four.slice(-12)) + "ms");
    $("#promod #six .avg12").text(averageOf(times.six.slice(-12)) + "ms");
    $("#promod #eight .avg12").text(averageOf(times.eight.slice(-12)) + "ms");
    $("#promod #ten .avg12").text(averageOf(times.ten.slice(-12)) + "ms");

    localStorage["promod"] = JSON.stringify(times);
  }

  function loadTimes() {
    if (localStorage["promod"]) {
      times = JSON.parse(localStorage["promod"]);
      if (Game.debug)
        console.log("Times loaded from localstorage");
      updateTimes();
    } else {
      times = { four:     [],
                fourAo5:  0,
                fourAo12: 0,
                six:      [],
                sixAo5:   0,
                sixAo12:  0,
                eight:    [],
                eightAo5: 0,
                eightAo12: 0,
                ten:      [],
                tenAo5:   0,
                tenAo12:  0
      };
      if (Game.debug)
        console.log("no existing times");
    }

    this.printTimes();
  }

  function printTimes() {
    times.four.forEach(function(e, i) {
      $("#promod #four ol").append("<li>" + e.time + "ms</li>");
    });

    times.six.forEach(function(e, i) {
      $("#promod #six ol").append("<li>" + e.time + "ms</li>");
    });

    times.eight.forEach(function(e, i) {
      $("#promod #eight ol").append("<li>" + e.time + "ms</li>");
    });

    times.ten.forEach(function(e, i) {
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
