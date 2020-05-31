import React from "react";
import { Marker } from "react-map-gl";
import MarkerIcon from "@material-ui/icons/Room";
import shortid from "shortid";

const Markers = (props) => {
	const { data } = props;

	return data.map((place) => {
		const [longitude, latitude] = place.center;
		return (
			<Marker
				key={shortid.generate()}
				longitude={longitude}
				latitude={latitude}
			>
				<MarkerIcon />
			</Marker>
		);
	});
};

export default Markers;
