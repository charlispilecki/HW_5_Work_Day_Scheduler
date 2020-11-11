
var currentDayMonthYear = moment().format("dddd, MMM Do, YYYY"); 
$("#currentDay").append(currentDayMonthYear);

var currentTime = moment().format('LT');  
$("#currentTime").append(currentTime)


