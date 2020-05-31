import React from "react";
import shortid from "shortid";
import Marker from "./Marker";

const Markers = (props) => {
	const { data } = props;

	return data.map((place) => {
		const { lng, lat } = place.location;
		return (
			<Marker
				key={shortid.generate()}
				longitude={lng}
				latitude={lat}
				place={place}
				showPlace={props.showPlace}
				setShowPlace={props.setShowPlace}
			/>
		);
	});
};

export default Markers;
