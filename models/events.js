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
	date: {
		type: Date,
	},
	description: {
		type: String,
	},
	place: {
		type: String,
		ref: "Place",
	},
	type: {
		type: String,
	},
	createdBy: {
		type: String,
		ref: "User",
	},
});

const model = mongoose.models.Event || mongoose.model("Event", schema);

export default model;
