import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	person: {
		type: String,
		ref: "Person",
	},
	place: {
		type: String,
		ref: "Place",
	},
	date: {
		type: Date,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
});

const model = mongoose.models.Review || mongoose.model("Review", schema);

export default model;
