const convertToMin = function (hour, minute) {
  // convert both inputs into numbers
  // multiple hour by 60
  // add minute to result of product
  // return
  return Number(hour) * 60 + Number(minute);
}

module.exports = convertToMin;