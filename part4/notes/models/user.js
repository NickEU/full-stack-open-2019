const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const USERNAME_MIN_LENGTH = 6;

const userNameValidatorFnc = userName => userName.search(/[^a-z0-9]/i) === -1;

const userNameValidator = [
  userNameValidatorFnc,
  `Error! Username can only contain letters and digits.`
];

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    validate: userNameValidator,
    minlength: [
      USERNAME_MIN_LENGTH,
      `Error! Username must be at least ${USERNAME_MIN_LENGTH} symbols long`
    ]
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
