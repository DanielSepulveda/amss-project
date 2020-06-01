import nextConnect from "next-connect";
import Places from "models/places";
import User from "models/users";
import middleware from "middlewares";
import extractUser from "lib/api/extractUser";
import mongoose from "mongoose";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
	try {
		switch (req.query.action) {
			case "PLACES":
				{
					const places = await Places.find({});

					res.status(200).json({ places });
				}
				break;
			case "INFO":
				{
					const user = extractUser(req);
					if (!user) {
						res.status(400).end();
					}

					const place = await Places.findOne({ user: user._id }).populate(
						"categories"
					);

					res.status(200).json({ place });
				}
				break;
			default: {
				res.status(400).end();
			}
		}
	} catch (e) {
		res.status(500).end();
	}
});

handler.post(async (req, res) => {
	try {
		switch (req.query.action) {
			case "UPDATE_CATEGORIES":
				{
					const user = extractUser(req);

					if (!user) {
						res.status(400).end();
					}

					const { categories } = req.body;

					const nPlace = await Places.findOneAndUpdate(
						{ user: user._id },
						{ categories }
					);

					res.status(200).end();
				}
				break;
			default: {
				res.status(400).end();
			}
		}
	} catch (e) {
		console.log(e);
		res.status(500).end();
	}
});

export default handler;
