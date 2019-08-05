const { average } = require('../utils/for_testing');

describe('average', () => {
  test('avg of 1 value is the value itself', () => {
    expect(average([1])).toBe(1);
  });

  test('avg of many is calculated correctly', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test('avg of an empty array is 0', () => {
    expect(average([])).toBe(0);
  });
});
