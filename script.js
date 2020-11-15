// used moment to add the current date and time to the jumbotron
var currentDayMonthYear = moment().format("dddd, MMM Do, YYYY");
$("#currentDay").append(currentDayMonthYear);

var currentTime = moment().format('LT');
$("#currentTime").append(currentTime)

var timeParent = $("#time-container")

// dynamic time block array; added military time to make it easier to check for am/pm
var defaultTimeData = [
    {
        Hour: "8 AM",
        Military: 8,
        Desc: ""
    },
    {
        Hour: "9 AM",
        Military: 9,
        Desc: ""
    },
    {
        Hour: "10 AM",
        Military: 10,
        Desc: ""
    },
    {
        Hour: "11 AM",
        Military: 11,
        Desc: ""
    },
    {
        Hour: "12 PM",
        Military: 12,
        Desc: ""
    },
    {
        Hour: "1 PM",
        Military: 13,
        Desc: ""
    },
    {
        Hour: "2 PM",
        Military: 14,
        Desc: ""
    },
    {
        Hour: "3 PM",
        Military: 15,
        Desc: ""
    },
    {
        Hour: "4 PM",
        Military: 16,
        Desc: ""
    },
    {
        Hour: "5 PM",
        Military: 17,
        Desc: ""
    },
    {
        Hour: "6 PM",
        Military: 18,
        Desc: ""
    },
    {
        Hour: "7 PM",
        Military: 19,
        Desc: ""
    },
    {
        Hour: "8 PM",
        Military: 20,
        Desc: ""
    },
    {
        Hour: "9 PM",
        Military: 21,
        Desc: ""
    },
    {
        Hour: "10 PM",
        Military: 22,
        Desc: ""
    },
]


// Delete previous days data if necessary
var savedDate = localStorage.getItem('savedDate')
if (savedDate !== currentDayMonthYear) {
    localStorage.removeItem('timeData')
    localStorage.setItem('savedDate', currentDayMonthYear)
}

// Reading from local storage
var timeDataJson = localStorage.getItem('timeData');
var timeDataArray = defaultTimeData;
if (timeDataJson) {
    timeDataArray = JSON.parse(timeDataJson);
}


// loop that runs through each hour and adds the time blocks to the html
timeDataArray.forEach(function(hourData){
    var hour = hourData.Hour
    var desc = hourData.Desc
    var timeColor = timeColorCheck(hourData.Military)
    // dyanmic time block function, adding dynamic elements to html
    var timeBlock = `
        <div class="row ${timeColor}">
            <div class="hour col-1 pt-2">${hour}</div>
            <textarea class ="description col-10" placeholder="Enter your to-do's and/or appointments here">${desc}</textarea>
            <button class="saveBtn col-1">Save</button>
        </div>
        `
    // taking the element and inserting it into the DOM
    var timeBlockElement = $(timeBlock)
    timeParent.append(timeBlockElement)

    var textarea = timeBlockElement.find('textarea')[0]
    // Add event listener on the button
    var saveButton = timeBlockElement.find('button')[0]
    saveButton.addEventListener('click', function(){
        hourData.Desc = textarea.value
        localStorage.setItem('timeData', JSON.stringify(timeDataArray))
    })


})

function timeColorCheck(Military) {
// function takes the hour, compares it to current time, and returns either past, present, or future
var currentHour = moment().hour()
if (Military===currentHour){
return "present";
} else if (Military>currentHour){
    return "future";
}
    else if (Military<currentHour){
        return "past";
    }
}



