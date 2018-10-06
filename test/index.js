process.env.NODE_ENV = 'testing';

const _app = {};

_app.tests = {};

_app.tests.unit = require('./unit');

_app.countTests = () => {

  var count = 0;
  for (var key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)) {
      var subTests = _app.tests[key];
      for (var testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          count++;
        }
      }
    }
  }

  return count;
};

_app.runTests = () => {
  var counter = 0;
  var errors = [];
  var successes = 0;
  var limit = _app.countTests();

  for (var key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)) {
      var subTests = _app.tests[key];
      for (var testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          (() => {
            var tempTestName = testName;
            var testValue = subTests[testName];
            console.log('tempTestNametempTestName: ', tempTestName);

            try {
            testValue(() => {
              counter++;
              successes++;
              console.log('\x1b[32m%s\x1b[0m', tempTestName);
              console.log('Counter: ', counter + '  ' + limit);
              if (counter == limit) {
                _app.produceTestReport(limit, successes, errors);
              }
            });
          } catch(e) {
            console.log('\x1b[31m%s\x1b[0m', tempTestName);
            counter++;
            errors.push({
              'name' : testName,
              'error' : e
            });
            console.log('Counter: ', counter + '  ' + limit);
            if (counter == limit) {
              _app.produceTestReport(limit, successes, errors);
            }
          }
          })();
        }
      }
    }
  }
};

_app.produceTestReport = (limit, successes, errors) => {
  console.log('---------BEGIN TEST REPORT----------');
  console.log('');

  console.log('TOTAL TESTS: ', limit);
  console.log('PASSED TESTS: ', successes);
  console.log('FAILED TESTS', errors.length);
  console.log('');

  console.log('--------FAILED TESTS BEGIN-------');
  console.log('');
  errors.forEach((test) => {
    console.log('\x1b[31m%s\x1b[0m', test.name);
    console.log(test.error);
    console.log('');
  });
  console.log('');
  console.log('--------FAILED TESTS ENDS-------');


  console.log('');
  console.log('---------END TEST REPORT----------');
  // 0 indicated safe exit
  process.exit(0);
};

// run the test
_app.runTests();
