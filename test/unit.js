/**
 * Performs unit tests on lib.j functions.
 **/

const assert = require('assert');
const _lib = require('./../app/lib');

const unit = {};

// test generate random number with given input length
unit['generateRandomId: test if we get randomId generated with given length'] = (done) => {

  const randomId = _lib.generateRandomId(15);

  assert.equal(typeof(randomId), 'string', 'Generated id is not string');
  assert.equal(randomId.length, 15, 'Generated id is not of length 10');
  done();
};

// test generate random number with no input
unit['generateRandomId: test if we get randomId generated with no input length'] = (done) => {

  const randomId = _lib.generateRandomId();

  assert.equal(typeof(randomId), 'string', 'Generated id is not string');
  assert.equal(randomId.length, 10, 'Generated id is not of length 10');
  done();
};

// test generate random number that it does not throw an error even with string input
unit['generateRandomId: test that randomId does not throw an error even with string input'] = (done) => {

  assert.doesNotThrow( () => {
    const randomId = _lib.generateRandomId('testing');

    assert.equal(typeof(randomId), 'string', 'Generated id is not string');
    assert.equal(randomId.length, 10, 'Generated id is not of length 10');
    done();
  } , TypeError);
};

// test callback square function
unit['lib.findSquareOfInput: check if we get correct sqaure of the given number'] = (done) => {

  _lib.getSquare(2, (output) => {
    assert.equal(typeof(output), 'number');
    assert.equal(4, output);
    done();
  });
};

// test for wrong input
unit['lib.findSquareOfInput: should get false in callback when wrong input is given'] = (done) => {

  _lib.getSquare('test', (output) => {
    assert.equal(output, false);
    done();
  });
};


// checks if the string is palindrom
unit['checkPalindrome: checks if the string is palindrom'] = (done) => {
  _lib.checkPalindrome('nitin', (isPalindrom) => {
    assert.ok(isPalindrom);
    done();
  });
};

// checks if the string is palindrom
unit['checkPalindrome: checks if the string is not palindrom'] = (done) => {
  _lib.checkPalindrome('sushil', (isPalindrom) => {
    assert.equal(false, isPalindrom);
    done();
  });
};

module.exports = unit;
