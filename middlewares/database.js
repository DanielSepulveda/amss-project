import mongoose from "mongoose";
import Categories from "models/categories";
import Events from "models/events";
import Friends from "models/friends";
import Groups from "models/groups";
import Messages from "models/messages";
import Persons from "models/persons";
import Places from "models/places";
import Promotions from "models/promotion";
import Reviews from "models/reviews";
import Users from "models/users";

const status = {};

const dbConnect = async () => {
	if (status.isConnected) {
		return;
	}

	await mongoose.connect(process.env.MONGO_DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});

	status.isConnected = mongoose.connections[0].readyState;
};

const database = async (req, res, next) => {
	if (!status.isConnected) await dbConnect();

	req.dbClient = mongoose.connections[0];

	return next();
};

export default database;
export { dbConnect };
