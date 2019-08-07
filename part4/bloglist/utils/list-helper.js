const dummy = blogs => (blogs ? 1 : 1);

const totalLikes = blogs => blogs.reduce((acc, curr) => acc + curr.likes, 0);

const favoriteBlog = blogs => (Array.isArray(blogs) && blogs.length > 0
  ? blogs.reduce((acc, curr) => (acc.likes > curr.likes ? acc : curr))
  : 0);

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const authorNames = blogs.map(blog => blog.author);
  const result = authorNames.reduce((acc, curr) => {
    acc[curr] = acc[curr] || {};
    acc[curr].author = curr;
    acc[curr].blogs = acc[curr].blogs ? acc[curr].blogs + 1 : 1;
    return acc;
  }, {});
  return Object.values(result).sort((a, b) => b.blogs - a.blogs)[0];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const likesArr = blogs.map(blog => ({ author: blog.author, likes: blog.likes }));
  const result = likesArr.reduce((acc, curr) => {
    // console.log('before = ', acc);
    acc[curr.author] = acc[curr.author] === undefined ? curr.likes : curr.likes + acc[curr.author];
    // console.log('after = ', acc);
    return acc;
  }, {});
  const sortedLikes = Object.entries(result).sort((a, b) => b[1] - a[1]);
  return { author: sortedLikes[0][0], likes: sortedLikes[0][1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
