import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
    minlength: 1,
  },
  for: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;