import {oneHour, validMinutes, minBookingHour, maxBookingHours} from './utils';
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

export default isValidDate;