import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	name: {
		type: String,
		required: [true, "Please provide a name for the establishment"],
	},
	city: {
		type: String,
		required: [true, "Please provide a valid city"],
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
		default: "establishment",
    },
    description:{
        type: String
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    categories:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }]
});

const model = mongoose.models.Establishment || mongoose.model("Establishment", schema);

export default model;
