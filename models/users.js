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
	bday: {
		type: String,
		required: [true, "Please provide a birthday"],
	},
	phone: {
		type: String,
		unique: true,
		required: [true, "Please provide a phone"],
	},
	email: {
		type: String,
		unique: true,
		required: [true, "Please provide an email"],
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
	},
	type: {
		type: String,
		default: "user",
	},
});

const model = mongoose.models.User || mongoose.model("User", schema);

export default model;
