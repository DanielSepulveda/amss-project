import nextConnect from "next-connect";
import Persons from "models/persons";
import User from "models/users";
import Friends from "models/friends";
import middleware from "middlewares";
import extractUser from "lib/api/extractUser";
import mongoose from "mongoose";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
	try {
		switch (req.query.action) {
			case "INFO":
				{
					const user = extractUser(req);
					if (!user) {
						res.status(400).end();
					}

					const person = await Persons.findOne({ user: user._id })
						.populate("preferences")
						.populate("user");

					res.status(200).json({ person });
				}
				break;
			case "FRIENDS":
				{
					const user = extractUser(req);
					if (!user) {
						res.status(400).end();
					}

					const userPerson = await Persons.findOne({ user: user._id });

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

					const nFriends = await Persons.find({
						_id: { $in: friendsIds },
					}).populate("user");

					const possibleFriends = await Persons.find({
						_id: { $nin: [...friendsIds, userPerson._id] },
					}).populate("user");

					res.status(200).json({ friends: nFriends, possibleFriends });
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
			case "UPDATE_PREFERENCES":
				{
					const user = extractUser(req);

					if (!user) {
						res.status(400).end();
					}

					const { preferences } = req.body;

					const nPlace = await Persons.findOneAndUpdate(
						{ user: user._id },
						{ preferences }
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
