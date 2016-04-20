/** NOTE: uses jQuery for quick & easy DOM manipulation **/

function getLocation(){
  var msg; 

  /** 
  first, test for feature support
  **/
  if('geolocation' in navigator){
    // geolocation is supported :)
    requestLocation();
  }else{
    // no geolocation :(
    msg = "Sorry, looks like your browser doesn't support geolocation";
    outputResult(msg); // output error message
    $('.pure-button').removeClass('pure-button-primary').addClass('pure-button-success'); // change button style
  }

  /*** 
  requestLocation() returns a message, either the users coordinates, or an error message
  **/
  function requestLocation(){
    /**
    getCurrentPosition() below accepts 3 arguments:
    a success callback (required), an error callback  (optional), and a set of options (optional)
    **/
  
    var options = {
      // enableHighAccuracy = should the device take extra time or power to return a really accurate result, or should it give you the quick (but less accurate) answer?
      enableHighAccuracy: false,
      // timeout = how long does the device have, in milliseconds to return a result?
      timeout: 5000,
      // maximumAge = maximum age for a possible previously-cached position. 0 = must return the current position, not a prior cached position
      maximumAge: 0
    };
  
    // call getCurrentPosition()
    navigator.geolocation.getCurrentPosition(success, error, options); 
  
    // upon success, do this
    function success(pos){
      // get longitude and latitude from the position object passed in
      var lng = pos.coords.longitude;
      var lat = pos.coords.latitude;
      // and presto, we have the device's location!
      msg = 'Found you: ' + lng + ' and latitude: ' + lat  + '<img src="http://maps.googleapis.com/maps/api/staticmap?zoom=15&size=600x600&maptype=roadmap&markers=color:red%7Clabel:A%7C' + lat + ',' + lng+ '&sensor=false">';
      outputResult(msg); // output message
      $('.pure-button').removeClass('pure-button-primary').addClass('pure-button-success'); // change button style
    }
  
    // upon error, do this
    function error(err){
      // return the error message
      msg = 'Error: ' + err + ' :(';
      outputResult(msg); // output button
      $('.pure-button').removeClass('pure-button-primary').addClass('pure-button-error'); // change button style
    }  
  } // end requestLocation();

  /*** 
  outputResult() inserts msg into the DOM  
  **/
  function outputResult(msg){
    $('.result').addClass('result').html(msg);
  }
} // end getLocation()

// attach getLocation() to button click
$('.pure-button').on('click', function(){
  // show spinner while getlocation() does its thing
  $('.result').html('<i class="fa fa-spinner fa-spin"></i>');
  getLocation();
});


var horizontalLine = document.getElementById("horizontal");
var verticalLine = document.getElementById("vertical");
var dot = document.getElementById("dot");
var outercircle = document.getElementById("outercircle");
var indicator = document.getElementById("indicator");

var track = function(e) {
  horizontalLine.y1.baseVal.value = e.clientY;
  horizontalLine.y2.baseVal.value = e.clientY;
  verticalLine.x1.baseVal.value = e.clientX;
  verticalLine.x2.baseVal.value = e.clientX;

  dot.cx.baseVal.value = e.clientX;
  dot.cy.baseVal.value = e.clientY;
  
  outercircle.cx.baseVal.value = e.clientX;
  outercircle.cy.baseVal.value = e.clientY;
  
  indicator.innerHTML = "x: " + e.clientX + " | y: " + e.clientY;
  //console.log(e.clientX,e.clientY);
}

window.addEventListener("mousemove", track);
window.addEventListener("touchmove", track);
//document.onmousemove = track();

//document.addEventListener("touchstart", function(e) {
//}

$(document).ready(function() {
  var browser = get_browser_info();
  console.log(browser);
  $('.header').html(browser.toLowerCase());
  $('html').addClass(browser.toLowerCase());
});

function get_browser_info() {
  var ua = navigator.userAgent,
    tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'msie';
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) {
      return 'opera'
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return M[0];
}