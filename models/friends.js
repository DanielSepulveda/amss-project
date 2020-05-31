import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	person1: {
		type: String,
		ref: "Person",
	},
	person2: {
		type: String,
		ref: "Person",
	},
	since: {
		type: Date,
	},
});

const model = mongoose.models.Friend || mongoose.model("Friend", schema);

export default model;
