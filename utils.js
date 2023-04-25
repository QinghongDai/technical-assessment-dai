// A booking can be booked in 15 min increments e.g. 1600 to 1715
export const validMinutes = [0, 15, 30, 45];
// The rules to calculate the hourly rate of a booking are summarised below
export const RATES = {
    "Day":38,
    "Night":42.93,
    "Sat":45.91,
    "Sun":60.85
}
// sun: date.getDay() == 0; sat: date.getDay() == 6
export const WEEKEND = {
    "Mon":1,
    "Tue":2,
    "Wed":3,
    "Thu":4,
    "Fri":5,
    "Sat":6,
    "Sun":0
}
//night time start from 20:00
export const nightTimeStart = 20;
//day time start from 06:00
export const dayTimeStart = 6;
//1 hour = 1*3600*1000 ms
export const oneHour = 1*3600*1000;
// The minimum booking time is 1 hour
export const minBookingHour = 1;
// The maximum booking time is 24 hours
export const maxBookingHours = 24;
// one day is 24 hours
export const oneDayHours = 24;
// 1 hour has 60 mins
export const oneHourMins = 60;