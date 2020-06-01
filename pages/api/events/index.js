import nextConnect from "next-connect";
import Places from "models/places";
import Users from "models/users";
import Persons from "models/persons";
import Events from "models/events";
import Friends from "models/friends";
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

						const myEvents = nUser.person.events;

						const publicEvents = await Events.find({
							createdBy: { $ne: user._id },
							type: "public",
						})
							.populate("createdBy")
							.populate("place");

						res.status(200).json({ myEvents, publicEvents });
					} else {
						const nUser = await Users.findOne({ _id: user._id }).populate({
							path: "place",
							populate: {
								path: "events",
								populate: {
									path: "createdBy place",
								},
							},
						});

						res.status(200).json({ myEvents: nUser.place.events });
					}
				}
				break;
			case "EVENT":
				{
					const user = extractUser(req);
					if (!user) {
						res.status(400).end();
					}

					const { id: eventId } = req.query;

					if (user.type === "person") {
						const event = await Events.findOne({ _id: eventId })
							.populate("createdBy")
							.populate("place");

						const attending = await Persons.exists({
							user: user._id,
							events: { $in: [event._id] },
						});

						const myEvent = event.createdBy._id === user._id;

						const peopleAttending = await Persons.find({
							user: { $ne: user._id },
							events: { $in: [event._id] },
						}).populate("user");

						const relations = await Friends.find({
							$or: [{ person1: user._id }, { person2: user._id }],
						})
							.populate({ path: "person1", populate: { path: "user" } })
							.populate({ path: "person2", populate: { path: "user" } });

						const friends = relations.map((r) => {
							if (r.person1.user._id !== user._id) {
								return r.person1;
							} else {
								return r.person2;
							}
						});

						const friendsIds = friends.map((f) => f._id);

						const inviteFriends = await Persons.find({
							_id: { $in: friendsIds },
							events: { $nin: [event._id] },
						}).populate("user");

						res.status(200).json({
							event,
							attending,
							peopleAttending,
							myEvent,
							friends: inviteFriends,
						});
					} else {
						const event = await Events.findOne({ _id: eventId })
							.populate("createdBy")
							.populate("place");

						const peopleAttending = await Persons.find({
							events: { $in: [event._id] },
						}).populate("user");

						res.status(200).json({ event, peopleAttending });
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
			case "CREATE_EVENT":
				{
					const user = extractUser(req);

					if (!user) {
						res.status(400).end();
					}

					const values = req.body;

					if (user.type === "person") {
						const nEvent = await Events({
							...values,
						});

						await nEvent.save();

						const person = await Persons.findOne({ user: user._id });

						person.events.push(nEvent);

						await person.save();
					} else {
						const nUser = await Users.findOne({ _id: user._id }).populate(
							"place"
						);

						values.place = nUser.place._id;

						const nEvent = await Events({
							...values,
						});

						await nEvent.save();

						const place = await Places.findOne({ user: user._id });

						place.events.push(nEvent);

						await place.save();
					}

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
