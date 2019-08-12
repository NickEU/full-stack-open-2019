const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 });
  res.json(users.map(u => u.toJSON()));
});

const pwIsNotValid = pw => {
  return !/[a-z]/i.test(pw) || !/[\d]/.test(pw) || pw.length < 6;
};

usersRouter.post('/', async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    if (pwIsNotValid(password)) {
      res.status(400).send({
        error:
          'password is too weak! has to be at least 6 chars long and contain at least 1 digit and 1 letter'
      });
      return;
    }

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
