'use strict'

// Input: time in "HH:MM"
// Output: time in plain English (string)
// Constraints: The input will always be a valid time between '00:00' and '23:59'.
// Edge cases: '00:00' => midnight
//             '12:00' => noon
//             'HH:30' => half past <time>
//             'HH:15' => quarter past <time>
//             'HH:45' => quarter to <time + 1>
//             'HH:0M' => <time> oh <min>
//             '11:55' => five to noon
//             'HH:00' => <hour> o'clock
// cases where 12 is 'noon':
//    any time before noon
//    exactly at noon
//    5, 10, 15, 30 min past noon
// cases where 12 is 'twelve':
//    all other cases

// cases where 00 is 'midnight':
//    any time before midnight
//    exactly at midnight
//    5, 10, 15, 30 min past midnight
// cases where 00 is 'twelve':
//    all other cases

const hour = require('./hour2text');
const minute = require('./min2text');
const convertToMin = require('./convertToMin');

function time2text (time) { //string
  // if time is midnight, return 'midnight'
  if (time === '00:00' || time === '24:00') return 'midnight';
  // if time is noon, return 'noon'
  if (time === '12:00') return 'noon';

  const [hr, min] = time.split(':');
  let strTime = '';
  let isNoonOrMidnight = false;
  const totalMins = convertToMin(hr, min);

  if (min === '30' || min === '15' || min === '05' || min === '10' || min === '20') {
    if (hr === '12' || hr === '00') {
      isNoonOrMidnight = true;
    }
    strTime += `${minute[min]} past ${hour[hr]}`;
  } else if (min === '45' || min === '55' || min === '50' || min === '40') {
    let num = Number(hr) + 1;
    if (num < 10) {
      num = '0' + num;
    }
    if (num === 12 || num === 24) {
      isNoonOrMidnight = true;
    }
    strTime += `${minute[min]} to ${hour[num]}`;
  } else if (min === '00') {
    strTime += hour[hr] + ' o\'clock';
  } else {
    if (hr === '00' || hr === '12') {
      strTime += `twelve ${minute[min]}`;
    } else {
      strTime += hour[hr] + ' ' + minute[min];
    }
  }



  // denotes time of the day
  if (!isNoonOrMidnight) {
    if (hr >= 18 || [1060, 1065, 1070, 1075].includes(totalMins) ) {
      //append 'in the evening
      strTime += ' in the evening';
    } else if (hr >= 12 || [700, 705, 710, 715].includes(totalMins)){
      //append 'in the afternoon'
      strTime += ' in the afternoon';
    } else {
      //append 'in the morning'
      strTime += ' in the morning';
    }
  }

  return strTime;
}

module.exports = time2text
