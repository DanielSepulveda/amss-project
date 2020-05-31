import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	friends: [
		{
			type: String,
			ref: "Friend",
		},
	],
	groups: [
		{
			type: String,
			ref: "Group",
		},
	],
	events: [
		{
			type: String,
			ref: "Event",
		},
	],
	user: {
		type: String,
		ref: "User",
	},
	preferences: [
		{
			type: String,
			ref: "Category",
		},
	],
	reviews: [
		{
			type: String,
			ref: "Review",
		},
	],
});

const model = mongoose.models.Person || mongoose.model("Person", schema);

export default model;
