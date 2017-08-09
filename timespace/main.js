// Define variables
var timeDisplay = document.getElementById('time');
var circleOne = document.getElementById('circle-one');
var circleTwo = document.getElementById('circle-two');
var circleThree = document.getElementById('circle-three');
var circleFour = document.getElementById('circle-four');

// Define functions
function everySecond() {
  var now = new Date();
  var time = now.getTime().toString();
  var circleOneColor = time.slice(-6);
  var circleTwoColor = time.slice(-7,-1);
  var circleThreeColor = time.slice(-8,-2);
  var circleFourColor = time.slice(-9,-3);
  var digitOne = time.slice(-1);
  var digitTwo = time.slice(-2,-1);
  var digitThree = time.slice(-3,-2);
  var digitFour = time.slice(-4,-3);
  var digitFive = time.slice(-5,-4);
  var hours = ('0' + now.getHours()).slice(-2);
  var minutes = ('0' + now.getMinutes()).slice(-2);
  var seconds = ('0' + now.getSeconds()).slice(-2);
  timeDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
  circleOne.style.bottom = digitTwo + digitFour + '.' + digitFour + '%';
  circleOne.style.right = digitFour + digitTwo + '.' + digitOne + '%';
  circleOne.style.background = '#' + circleOneColor;
  circleTwo.style.top = digitThree + digitFour + '.' + digitTwo + '%';
  circleTwo.style.right = digitFour + digitFive + '.' + digitTwo + '%';
  circleTwo.style.background = '#' + circleTwoColor;
  circleThree.style.bottom = digitFive + digitFour + '.' + digitThree + '%';
  circleThree.style.left = digitFour + digitTwo + '.' + digitFive + '%';
  circleThree.style.background = '#' + circleThreeColor;
  circleFour.style.top = digitFour + digitOne + '.' + digitThree + '%';
  circleFour.style.left = digitOne + digitFour + '.' + digitThree + '%';
  circleFour.style.background = '#' + circleFourColor;
}

setInterval(everySecond, 1000);
