import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	nameCategory: {
		type: String,
		required: [true, "Please provide a name"],
		unique:true,
	},
	description: {
		type: String,
		required: [true, "Please provide a description"],
	}
});

const model = mongoose.models.Category || mongoose.model("Category", schema);

export default model;
