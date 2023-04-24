// Add your implementation for booking calculator in this file...
// Currently it just outputs the same input

const calculator = (input) => {
  var output = []
  // A booking can be booked in 15 min increments e.g. 1600 to 1715
  var validMinutes = [0, 15, 30, 45]
  // The rules to calculate the hourly rate of a booking are summarised below
  const RATES = {
      "Day":38,
      "Night":42.93,
      "Sat":45.91,
      "Sun":60.85
  }
  // sun: date.getDay() == 0; sat: date.getDay() == 6
  const WEEKEND = {
      "Sat":6,
      "Sun":0
  }
  //night time start from 20:00
  var nightTimeStart = 20
  //day time start from 06:00
  var dayTimeStart = 6
  //1 hour = 1*3600*1000 ms
  var oneHour = 1*3600*1000
  // The minimum booking time is 1 hour
  var minBookingHour = 1
  // The maximum booking time is 24 hours
  var maxBookingHours = 24

  input.forEach(function(v){
      const startDate = new Date(v.from)
      const endDate = new Date(v.to)
      v.isValid = false
      v.total = 0
      // The minimum booking time is 1 hour
      // The maximum booking time is 24 hours
      // A booking cannot end before it has started
      // A booking can be booked in 15 min increments e.g. 1600 to 1715
      var bookingTime = (endDate.getTime() - startDate.getTime()) / oneHour
      if (minBookingHour <= bookingTime
        && bookingTime <= maxBookingHours
        && validMinutes.includes(startDate.getMinutes())
        && validMinutes.includes(endDate.getMinutes())) {
          v.isValid = true
      }
      // If any part of a booking is charged at the night rate, the whole booking is charged at the night rate:
      // Fri 1800 - 2100 will be charged at the night rate (3 x 42.93)
      // Wed 0500 - 1000 will be charged at the night rate (5 x 42.93)
      // Saturday and Sunday rates apply across the whole day, there's no distinction between day and night:
      // Sat 1800 - 2200 will be charged at the sat rate (4 x 45.91)
      // Sun 0100 - 0700 will be charged at the sun rate (6 x 60.85)
      var rate = 0
      if (v.isValid == true) {
            if (startDate.getDay() == WEEKEND.Sun
                || endDate.getDay() == WEEKEND.Sun) {
                rate = RATES.Sun
            } else if (startDate.getDay() == WEEKEND.Sat
                || endDate.getDay() == WEEKEND.Sat) {
                rate = RATES.Sat
            } else if (startDate.getHours() >= nightTimeStart
                || startDate.getHours() < dayTimeStart
                || (endDate.getHours() > nightTimeStart || (endDate.getHours() == nightTimeStart && endDate.getMinutes() > 0))
                || endDate.getHours() <= dayTimeStart) {
                rate = RATES.Night
            } else {
                rate = RATES.Day
            }

            v.total = Math.floor(bookingTime * rate * 100) / 100
      }

      output.push(v)
  });
  return output;
}

export default calculator;
