import nextConnect from "next-connect";
import middleware from "middlewares";
import User from "models/users";
import extractUser from "lib/api/extractUser";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
	const user = extractUser(req);

	if (!user) {
		res.status(400).end();
		return;
	}

	try {
		if (user.type == "person") {
			const user = await User.findById(user._id).populate({
				path: "person",
				populate: {
					path: "preferences",
				},
			});
			console.log(user);
			res.status(200).json({ categories: user.person.preferences });
		} else {
			const user = await User.findById(user._id).populate({
				path: "place",
				populate: {
					path: "categories",
				},
			});
			console.log(user);
			res.status(200).json({ categories: user.place.categories });
		}
	} catch (e) {
		res.status(500).end();
	}
});

export default handler;
