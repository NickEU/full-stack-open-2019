const { mostBlogs } = require('../utils/list-helper');
const { blogs, blogsTwoAuthors } = require('../utils/mock-blogs');

describe('author with the most blogs', () => {
  test('of empty list is zero', () => {
    expect(mostBlogs([])).toBe(0);
  });

  test('when list has only 1 blog === that author', () => {
    expect(mostBlogs([blogs[0]])).toEqual({ author: blogs[0].author, blogs: 1 });
  });

  test('of a bigger list is calculated correctly', () => {
    expect(mostBlogs(blogs)).toEqual({ author: blogs[5].author, blogs: 3 });
  });

  test('if two authors have the same nmbr of blogs', () => {
    expect(mostBlogs(blogsTwoAuthors)).toBeOneOf([
      { author: blogsTwoAuthors[1].author, blogs: 2 },
      { author: blogsTwoAuthors[4].author, blogs: 2 },
    ]);
  });
});
