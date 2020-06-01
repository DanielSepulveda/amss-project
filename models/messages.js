import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	message: {
		type: String,
		required: [true, "Please provide a name"],
	},
	person: {
		type: String,
		ref: "Person",
	},
	group: {
		type: String,
		ref: "Group",
	},
});

const model = mongoose.models.Message || mongoose.model("Message", schema);

export default model;
