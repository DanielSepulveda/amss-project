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
	lastname: {
		type: String,
		required: [true, "Please provide a lastname"],
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Like",
		},
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const model = mongoose.models.User || mongoose.model("User", schema);

export default model;
