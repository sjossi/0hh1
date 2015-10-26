function Competition() {

  var startTime = 0,
      endTime = 0;
  this.startTimer = startTimer;
  this.stopTimer = stopTimer;

  function startTimer() {
    if(Game.debug)
      console.log("Started timer");
    this.startTime = (new Date()).getTime();
  }

  function stopTimer() {
    time = (new Date()).getTime() - this.startTime;
    if(Game.debug){
      console.log("It took you " + time + "ms");
    }
  }
}
