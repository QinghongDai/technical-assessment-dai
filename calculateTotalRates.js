import {RATES, WEEKEND, oneHour, nightTimeStart, dayTimeStart, oneDayHours, oneHourMins} from './utils';
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

export default calculateTotalRates;