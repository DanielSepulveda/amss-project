import mongoose from 'mongoose'
import { v4 } from "uuid";

const schema = new mongoose.Schema({
_id: {
    type: String,
    default: v4,
},
createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
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
  review: {
    type: String,
    required: true,
  }
})

const model = mongoose.models.Review || mongoose.model('Review', schema)

export default model
