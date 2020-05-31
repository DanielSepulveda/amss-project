import nextConnect from "next-connect";
import Places from "models/places";
import middleware from "../../../middlewares";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
	const places = await Places.find({});

	res.status(200).json({ places });
});

export default handler;
