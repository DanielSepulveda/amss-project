import mongoose from 'mongoose'
import { v4 } from "uuid";


const schema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
},
nameEvent:{
    type: String,
    required: true,
},
  establishment:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Establishment'
  },
  date:{
      type: Date,
      required: true,
  },
  invitedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const model = mongoose.models.Event || mongoose.model('Event', schema)

export default model
