const { Schema, SchemaTypes, model } = require('mongoose');

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const teamModel = model('Team', teamSchema);

module.exports = teamModel;
