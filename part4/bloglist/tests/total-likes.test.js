const { totalLikes } = require('../utils/list-helper');
const { blogs } = require('../utils/mock-blogs');

describe('total likes of all blogs', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('when list has only 1 blog === the likes of that', () => {
    expect(totalLikes([blogs[0]])).toBe(7);
  });

  test('of a bigger list is calculated correctly', () => {
    expect(totalLikes(blogs)).toBe(36);
  });
});
