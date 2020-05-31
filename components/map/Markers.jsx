import React from "react";
import shortid from "shortid";
import Marker from "./Marker";

const Markers = (props) => {
	const { data } = props;

	return data.map((place) => {
		const [longitude, latitude] = place.center;
		return (
			<Marker
				key={shortid.generate()}
				longitude={longitude}
				latitude={latitude}
				place={place}
			/>
		);
	});
};

export default Markers;
