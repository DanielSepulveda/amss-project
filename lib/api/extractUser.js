const extractUser = (req) => {
	if (!req.user) return null;


	const { _id, name, email, type } = req.user;

	return {
		_id,
		name,
		email,
		type,
	};
};

export default extractUser;
