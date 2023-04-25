// Add your implementation for booking calculator in this file...
// Currently it just outputs the same input


// A booking can be booked in 15 min increments e.g. 1600 to 1715
const validMinutes = [0, 15, 30, 45];
// The rules to calculate the hourly rate of a booking are summarised below
const RATES = {
    "Day":38,
    "Night":42.93,
    "Sat":45.91,
    "Sun":60.85
}
// sun: date.getDay() == 0; sat: date.getDay() == 6
const WEEKEND = {
    "Mon":1,
    "Tue":2,
    "Wed":3,
    "Thu":4,
    "Fri":5,
    "Sat":6,
    "Sun":0
}
//night time start from 20:00
const nightTimeStart = 20;
//day time start from 06:00
const dayTimeStart = 6;
//1 hour = 1*3600*1000 ms
const oneHour = 1*3600*1000;
// The minimum booking time is 1 hour
const minBookingHour = 1;
// The maximum booking time is 24 hours
const maxBookingHours = 24;
// one day is 24 hours
const oneDayHours = 24;
// 1 hour has 60 mins
const oneHourMins = 60;

const calculator = (input) => {
    var output = [];
    input.forEach(function(v){
        //default value
        v.isValid = false;
        v.total = 0;

        if (isValidDate(v.from, v.to)){
            v.isValid = true;
        }

        if (v.isValid) {
            v.total = calculateTotalRates(v.from, v.to);
        }

        output.push(v);
    });
    return output;
}

// The minimum booking time is 1 hour
// The maximum booking time is 24 hours
// A booking cannot end before it has started
// A booking can be booked in 15 min increments e.g. 1600 to 1715
const isValidDate = (from, to) => {
    var startDate = new Date(from);
    var endDate = new Date(to);

    //from and to should be the same timezone
    if (from.substring(from.length-6) == (to.substring(to.length-6))) {
        var bookingTime = (endDate.getTime() - startDate.getTime()) / oneHour

        if (bookingTime >= minBookingHour
            && bookingTime <= maxBookingHours
            && validMinutes.includes(startDate.getMinutes())
            && validMinutes.includes(endDate.getMinutes())) {
            return true;
        }
    }
    return false;
}

// If any part of a booking is charged at the nighst rate, the whole booking is charged at the night rate:
// Fri 1800 - 2100 will be charged at the night rate (3 x 42.93)
// Wed 0500 - 1000 will be charged at the night rate (5 x 42.93)
// Saturday and Sunday rates apply across the whole day, there's no distinction between day and night:
// Sat 1800 - 2200 will be charged at the sat rate (4 x 45.91)
// Sun 0100 - 0700 will be charged at the sun rate (6 x 60.85)
const calculateTotalRates = (from, to) => {
    var startDate = new Date(from);
    var endDate = new Date(to);

    var firstDayHours = 0;
    var firstDayRate = 0;
    var secondDayHours = 0;
    var secondDayRate = 0;

    //from and to is the same day
    if (startDate.getHours() < endDate.getHours()) {
        firstDayHours = (endDate.getTime() - startDate.getTime()) / oneHour;
        switch (startDate.getDay()) {
            case WEEKEND.Sun:
                firstDayRate = RATES.Sun;
                break;
            case WEEKEND.Sat:
                firstDayRate = RATES.Sat;
                break;
            default:
                if (startDate.getHours() < dayTimeStart
                    || endDate.getHours() > nightTimeStart
                    || (endDate.getHours() == nightTimeStart && endDate.getMinutes() > 0)) {
                    firstDayRate = RATES.Night;
                } else {
                    firstDayRate = RATES.Day
                }
        }
    } else {
        //from and to is not the same day
        firstDayHours = oneDayHours - startDate.getHours() - (startDate.getMinutes() / oneHourMins);
        secondDayHours = endDate.getHours() + (endDate.getMinutes() / oneHourMins);

        switch (startDate.getDay()) {
            case WEEKEND.Sun:
                firstDayRate = RATES.Sun;
                secondDayRate = RATES.Night;
                break;
            case WEEKEND.Sat:
                firstDayRate = RATES.Sat;
                secondDayRate = RATES.Sun;
                break;
            case WEEKEND.Fri:
                firstDayRate = RATES.Night;
                secondDayRate = RATES.Sat;
                break;
            default:
                firstDayRate = RATES.Night;
                secondDayRate = RATES.Night;
        }
    }
    return Math.floor(((firstDayHours * firstDayRate) + (secondDayHours * secondDayRate)) * 100) / 100
}

export default calculator;
