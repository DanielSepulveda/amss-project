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
	likes:[{
      type: String,
      unique: true
	}]
});

const model = mongoose.model("User1", schema);

export default model;
