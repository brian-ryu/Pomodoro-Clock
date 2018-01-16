//Declare time variables
var pomodoro;
var short;
var long;

var beep = new Audio("https://www.soundjay.com/button/sounds/beep-05.mp3");

var countdown;
var set;
var curr;

function display() {
  
  //Update countdown display
  $("#current").html('<h5 id = "current">' + curr + '</h5>');
  $("#clock").html('<h1 id = "clock">' + countdown[0] + ':' + addZero(countdown[1]) + '</h1>');
  $("#set-progress").html('<h5 id = "set-progress">' + set + '/4</h5>');
  
  //Update time value display
  $("#pomodoro-length").html('<h3 id = "pomodoro-length">' + pomodoro + '</h3>');
  $("#short-length").html('<h3 id = "short-length">' + short + '</h3>');
  $("#long-length").html('<h3 id = "long-length">' + long + '</h3>');
  
}

function addZero(sec) {
  if (sec < 10) {
    return "0" + sec;
  }
  return sec;
}

function disableButtons() {
  go.disabled = true;
  pless.disabled = true;
  pmore.disabled = true;
  sless.disabled = true;
  smore.disabled = true;
  lless.disabled = true;
  lmore.disabled = true;
}

function eachSec() {
  
  //Subtract a second from the count
  countdown[1]--;
  
  //Check if a minute is up
  if (countdown[1] == -1) {
    countdown[0]--;
    countdown[1] = 59;
  }
  
  //Check if the current time session is up
  if (countdown[0] == -1) {
    if (curr == "Pomodoro") { //If a pomodoro has just been finished
      if (set == 4) {
        countdown = [long, 0];
        curr = "Long Break";
      }else {
        countdown = [short, 0];
        curr = "Short Break";
      }
      beep.play();
    }else { //If a break has just been finished
      curr = "Pomodoro"
      countdown = [pomodoro, 0];
      if (set == 4) {
        set = 1;
      }else {
        set++;
      }
    }
  }
  
  //Display new count
  display();
}

$(document).ready(function() {
  
  //Initialize time variables
  pomodoro = 25;
  short = 5;
  long = 30;
  countdown = [pomodoro, 0];
  set = 1;
  curr = "Pomodoro";
  interval = 1000;
  
  //Display times
  display();
  
  //Set up button event handlers
  $("#go").click(function(){
    disableButtons();
    setInterval(eachSec, interval);
  });
  $("#pless").click(function(){
    if (pomodoro != 1) {
      pomodoro--;
    }
    countdown = [pomodoro, 0];
    display();
  });
  $("#pmore").click(function(){
    pomodoro++;
    countdown = [pomodoro, 0];
    display();
  });
  $("#sless").click(function(){
    if (short != 1) {
      short--;
    }
    display();
  });
  $("#smore").click(function(){
    short++;
    display();
  });
  $("#lless").click(function(){
    if (long != 1) {
      long--;
    }
    display();
  });
  $("#lmore").click(function(){
    long++;
    display();
  });
  
});