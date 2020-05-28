import mongoose from 'mongoose'
import { v4 } from "uuid";


const reservaSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
},
establishment:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Establishment'
},
  numberPeople:{
    type: Number,
    required: true
  },
  date:{
      type: Date,
      required: true,
  },
  reservationUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const model = mongoose.models.Reservation || mongoose.model('Reservation', reservaSchema)

export default model
