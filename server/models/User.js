const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    }
  ],
  sentRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ExchangeRequest',
    }
  ],
  receivedRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ExchangeRequest',
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
