const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users.map(u => u.toJSON()));
});

usersRouter.post('/', async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    });

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (exc) {
    next(exc);
  }
});

module.exports = usersRouter;
