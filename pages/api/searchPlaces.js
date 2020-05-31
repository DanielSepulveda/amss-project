import nextConnect from "next-connect";
import axios from "axios";
import geocodeService from "@mapbox/mapbox-sdk/services/geocoding";
import middleware from "../../middlewares";

const handler = nextConnect();

handler.use(middleware);

const geocodeClient = geocodeService({
	accessToken:
		"pk.eyJ1IjoiYTAxMTkzOTExIiwiYSI6ImNrYXExNTA2YzA1Z3gycmxnbzJzbzVrdG4ifQ.tf47f5cViqBN0lrj43Z8Mg",
});

handler.get(async (req, res) => {
	// try {
	// 	const res = await axios.get(
	// 		`https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
	// 		{
	// 			params: {
	// 				key: process.env.PLACES_TOKEN,
	// 				location: `${25.678},${-100.3133}`,
	// 				radius: 1500,
	// 				type: "restaurant",
	// 			},
	// 		}
	// 	);
	// 	console.log(res);
	// } catch (e) {
	// 	console.log(e);
	// }

	const response = await geocodeClient
		.forwardGeocode({
			query: "italian",
			proximity: [-100.3133, 25.678],
			bbox: [-100.3183, 25.628, -100.3083, 25.728],
			types: ["poi"],
		})
		.send();

	const matches = response.body;

	console.log(matches.features);

	res.status(200).json(matches.features);
});

export default handler;
