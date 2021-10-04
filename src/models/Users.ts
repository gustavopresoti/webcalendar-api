import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

UsersSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model('User', UsersSchema);