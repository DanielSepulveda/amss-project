import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { ObjectId } from "mongodb";
import { dbConnect } from "./database";
import User from "../models/users";

dbConnect();

passport.serializeUser((user, done) => {
	done(null, user._id.toString());
});

passport.deserializeUser(async (req, id, done) => {
	const user = await User.findById(id);

	done(null, user);
});

passport.use(
	new LocalStrategy(
		{ usernameField: "email", passReqToCallback: true },
		async (req, email, password, done) => {
			const user = await User.findOne({ email });

			if (user && (await bcrypt.compare(password, user.password)))
				done(null, user);
			else done(null, false);
		}
	)
);

export default passport;
