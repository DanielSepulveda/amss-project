import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
	_id: {
		type: String,
		default: v4,
	},
	location: {
		lat: {
			type: Number,
		},
		lng: {
			type: Number,
		},
	},
	description: {
		type: String,
	},
	address: {
		type: String,
	},
	promotions: [
		{
			type: String,
			ref: "Promotion",
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
	categories: [
		{
			type: String,
			ref: "Category",
		},
	],
});

const model = mongoose.models.Place || mongoose.model("Place", schema);

export default model;
