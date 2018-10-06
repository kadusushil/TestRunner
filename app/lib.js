/**
 * This file has set of functions which will be tested by test runner.
 **/


const lib = {};


/**
 * Generates the random id with the input length. If input length is not
 * passed then default length would be 10.
 **/
lib.generateRandomId = (length) => {

  length = typeof(length) == 'number' && length > 0 ? length : 10;

  const randomChars = "abcdefghijklmnopqrstuvwxyz0123456789";

  var randomId = '';
  for (var i = 0; i < length; i++) {
    randomId += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  return randomId;
};

/**
 * Returns the square of the given input
 **/
lib.getSquare = (input, callback) => {
  input = typeof(input) == 'number' && input > 0 ? input : false;

  if (input) {
    const square = input * input;
    callback(square);
  } else {
    callback(false);
  }
};

lib.checkPalindrome = (str, callback) => {

  str = typeof('str') == 'string' && str.length > 0 ? str : false;
  if (str) {
  var isPalindrom = true;
  for (var i = 0; i < str.length; i++) {
      if (i >= (str.length/2)) {
        callback(isPalindrom);
        break;
      }
      if (str.charAt(i) != str.charAt(str.length-1-i)) {
        isPalindrom = false;
        callback(isPalindrom);
      }
    }
  } else {
      callback(false);
    }
  };


// export the lib
module.exports = lib;
