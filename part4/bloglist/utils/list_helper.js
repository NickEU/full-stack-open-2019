const dummy = blogs => (blogs ? 1 : 1);

const totalLikes = blogs => blogs.reduce((acc, curr) => acc + curr.likes, 0);

const favoriteBlog = blogs => (Array.isArray(blogs) && blogs.length > 0
  ? blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr))
  : 0);

const mostBlogs = blogs => blogs;

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
