import React from "react";
import { Marker, Popup } from "react-map-gl";
import MarkerIcon from "@material-ui/icons/Room";
import Typography from "@material-ui/core/Typography";

const MyMarker = (props) => {
	const handleClick = () => {
		props.setShowPlace(props.place._id);
	};

	const handleClose = () => {
		props.setShowPlace("");
	};

	return (
		<>
			<Marker longitude={props.longitude} latitude={props.latitude}>
				<div onClick={handleClick} style={{ cursor: "pointer" }}>
					<MarkerIcon />
				</div>
			</Marker>
			{props.showPlace === props.place._id && (
				<Popup
					latitude={props.latitude}
					longitude={props.longitude}
					closeButton={true}
					closeOnClick={false}
					onClose={handleClose}
					anchor="top"
				>
					<Typography>{props.place.description}</Typography>
					<Typography>{props.place.address}</Typography>
				</Popup>
			)}
		</>
	);
};

export default MyMarker;
