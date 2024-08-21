const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExchangeRequestSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  requestedBook: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  offeredBook: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  }
});

module.exports = mongoose.model('ExchangeRequest', ExchangeRequestSchema);
