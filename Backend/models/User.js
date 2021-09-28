const { Schema, model } = require('mongoose');
const util = require('util');

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
  },
  { timestamps: true }
);
userSchema.statics.findUserByEmail = async function (id) {
  const User = this;
  const user = await User.findById(id).exec();
  return user;
};

const userModel = model('User', userSchema);

module.exports = userModel;
