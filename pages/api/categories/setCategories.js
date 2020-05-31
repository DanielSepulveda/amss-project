import nextConnect from "next-connect";
import User from "models/users";
import Person from "models/persons";
import Place from "models/places";
import extractUser from "lib/api/extractUser";
import middleware from "../../../middlewares";

const handler = nextConnect();

handler.use(middleware);

handler.put(async (req, res) => {
	const user = extractUser(req);

	if (!user) {
		res.status(400).end();
		return;
	}

	const { categories } = req.body;

	try {
		if (user.type == "person") {
			await Person.findOneAndUpdate(
				{ user: user._id },
				{ preferences: categories }
			);
		} else {
			await Place.findOneAndUpdate({ user: user._id }, { categories });
		}

		res.status(200).end();
	} catch (e) {
		res.status(500).end();
	}
});

export default handler;
