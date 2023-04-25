import calculator from './calculator';

// You are welcome to modify and add tests in this file...
// Currently the test asserts that the input is the same as the output

describe('calculator', () => {
  test('outputs booking details after calculate', () => {
    const input = [{
      "id": 5,
                    "from": "2017-10-21T14:00:00+11:00",
                    "to": "2017-10-21T22:00+11:00"
    }];

    expect(calculator(input)).toEqual([{
      "id": 5,
              "from": "2017-10-21T14:00:00+11:00",
              "to": "2017-10-21T22:00+11:00",
              "isValid": true,
              "total": 367.28
    }]);
  });


});
