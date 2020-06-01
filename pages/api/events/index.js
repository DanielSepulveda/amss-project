import nextConnect from "next-connect";
import Places from "models/places";
import Users from "models/users";
import Persons from "models/persons";
import Events from "models/events";
import middleware from "middlewares";
import extractUser from "lib/api/extractUser";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
	try {
		switch (req.query.action) {
			case "EVENTS":
				{
					const user = extractUser(req);
					if (!user) {
						res.status(400).end();
					}

					if (user.type === "person") {
						const nUser = await Users.findOne({ _id: user._id }).populate({
							path: "person",
							populate: {
								path: "events",
								populate: {
									path: "createdBy place",
								},
							},
						});
						console.log(nUser);
						// .populate("person")
						// .populate("person.events")
						// .populate("person.events.createdBy")
						// .populate("person.events.place");
						res.status(200).json({ events: nUser.person.events });
					} else {
						const nUser = await Users.findOne({ _id: user._id })
							.populate("place")
							.populate("place.events")
							.populate("place.events.createdBy")
							.populate("place.events.place");

						res.status(200).json({ events: nUser.place.events });
					}
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

handler.post(async (req, res) => {
	try {
		switch (req.query.action) {
			case "CREATE_PERSON_EVENT":
				{
					const user = extractUser(req);

					if (!user || user.type === "place") {
						res.status(400).end();
					}

					const values = req.body;

					const nEvent = await Events({
						...values,
					});

					await nEvent.save();

					const person = await Persons.findOne({ user: user._id });

					person.events.push(nEvent);

					await person.save();

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
