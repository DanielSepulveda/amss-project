import mongoose from "mongoose";

const status = {};

const dbConnect = async () => {
	if (status.isConnected) {
		return;
	}

	await mongoose.connect(process.env.MONGO_DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
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
