const extractUser = (req) => {
	if (!req.user) return null;

	const { name, email, type } = req.user;

	return {
		name,
		email,
		type,
	};
};

export default extractUser;
