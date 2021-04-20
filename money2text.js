'use strict'

/*
Input: string with 2 dec places
Output: string of money in plain English
Constraints: 2 dec places and unlimited dollar amount
Edge Cases:
  "0.00" => no cents
  ".25"

*/

const tenth = require('./tenth');
const ones = require('./ones');
const places = require('./places')

function money2text (money) {
  let totalAmt = '';
  let [dollar, cents] = money.split('.');

  // determine length of dollar amount
  let len = dollar.length;
  let position = 0;
  if (dollar === '0') {
    totalAmt += ' zero';
    len--;
  }
  while (len) {
    let remainder = len % 3;
    let digit;
    if (remainder === 2) {
      // look at 2 digits
      digit = dollar.slice(position, position + 2);
      len -= 2;
      position += 2;
      if (digit === '00') continue;
      totalAmt += totalAmt.length ? ` and ${tenth[digit]}` : ` ${tenth[digit]}`;
    } else {
      // look at 1 degit
      digit = dollar.slice(position, position + 1);
      len -= 1;
      position += 1;
      if (digit === '0') continue;
      totalAmt += ' ' + ones[digit];
    }

    if (remainder === 0) {
      totalAmt += ' hundred';
    }

    if(places[len]) {
      totalAmt += ` ${places[len]}`;
    }

  }
  totalAmt += ' dollars';
  //add decimals
  if (cents !== '00') {
    totalAmt += ` and ${tenth[cents]} cents`;
  }

  return totalAmt.slice(1);
}

// console.log(money2text('0.00'));
// console.log(money2text('57.00'));
// console.log(money2text('7245.00'));
// console.log(money2text('5.00'));
// console.log(money2text('74245.00'));
// console.log(money2text('435245.00'));
// console.log(money2text('1000000.00'));
// console.log(money2text('10.85'));
// console.log(money2text('100.00'));
// console.log(money2text('1000.00'));
// console.log(money2text('0.50'));


module.exports = money2text

/*
dollar = '7245'
dollar = '174450'

text : seven thousand two hundred forty five dollars

len = 2, mod = 0

ones[dollars[0]] + hundred

str = one thousand

dollar[0]




*/
