import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	name: {
		type: String,
		required: [true, "Please provide a name"],
	},
	description: {
    type: String,
  },
  startDate: {
    type: Date,
  }
  endDate: {
    type: Date
  }
});

const model = mongoose.models.Promotion || mongoose.model("Promotion", schema);

export default model;
