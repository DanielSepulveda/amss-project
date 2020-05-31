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
	members: [
		{
			type: String,
			ref: "Person",
		},
	],
	messages: [
		{
			type: String,
			ref: "Message",
		},
	],
	events: [
		{
			type: String,
			ref: "Event",
		},
	],
});

const model = mongoose.models.Group || mongoose.model("Group", schema);

export default model;
