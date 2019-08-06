const { favoriteBlog } = require('../utils/list-helper');
const { blogs, blogsTied } = require('../utils/mock-blogs');

describe('blog with the most likes', () => {
  test('5 blogs return the highest', () => {
    expect(favoriteBlog(blogs)).toEqual(blogs[2]);
  });
  test('two blogs tied in likes can return either', () => {
    expect(favoriteBlog(blogsTied)).toBeOneOf([blogsTied[2], blogsTied[4]]);
  });
  test('a list of a single blog returns itself', () => {
    expect(favoriteBlog([blogs[2]])).toEqual(blogs[2]);
  });
  test('empty array returns 0', () => {
    expect(favoriteBlog([])).toEqual(0);
  });
});
