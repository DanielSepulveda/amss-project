import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import User from "models/users";
import Place from "models/places";
import Person from "models/persons";
import signupSchema from "lib/schemas/signup";
import middleware from "../../middlewares";
import extractUser from "../../lib/api/extractUser";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
	const { password, ...values } = req.body;

	if (!isEmail(values.email)) {
		res.status(400).send("The email you entered is invalid.");
		return;
	}

	try {
		await signupSchema.validate({ ...values, password });
	} catch (e) {
		console.log(e);
		res.status(400).send("Missing field(s)");
		return;
	}

	if (
		(await User.countDocuments({
			$or: [{ email: values.email }, { phone: values.phone }],
		})) > 0
	) {
		res.status(403).send("The email or phone have already been used.");
	}

	const { lat, lng, description, address, ...userValues } = values;

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({
		...userValues,
		password: hashedPassword,
	});

	if (values.type == "person") {
		const person = await Person({
			user: user._id,
		});
		await person.save();
		user.person = person;
		await user.save();
	} else {
		const place = await Place({
			location: {
				lat,
				lng,
			},
			description,
			address,
			user: user._id,
		});
		await place.save();
		user.place = place;
		await user.save();
	}

	req.logIn(user, (err) => {
		if (err) throw err;

		res.status(201).json({
			user: extractUser(req),
		});
	});
});

export default handler;
