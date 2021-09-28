const { Schema, model } = require('mongoose');

const boardSchema = new Schema(
  {
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    c1: { type: Number, default: 6 },
    c2: { type: Number, default: 8 },
    c3: { type: Number, default: 6 },
    c4: { type: Number, default: 8 },
    c_sold: { type: Number, default: 24 },
    latest: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const boardModel = model('Board', boardSchema);

module.exports = boardModel;
