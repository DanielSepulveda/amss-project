import React from "react";
import { Marker, Popup } from "react-map-gl";
import MarkerIcon from "@material-ui/icons/Room";
import Typography from "@material-ui/core/Typography";

const MyMarker = (props) => {
	const [showPopup, setShowPopup] = React.useState(false);

	const handleClick = () => {
		setShowPopup(true);
	};

	return (
		<>
			<Marker longitude={props.longitude} latitude={props.latitude}>
				<div onClick={handleClick} style={{ cursor: "pointer" }}>
					<MarkerIcon />
				</div>
			</Marker>
			{showPopup && (
				<Popup
					latitude={props.latitude}
					longitude={props.longitude}
					closeButton={true}
					closeOnClick={false}
					onClose={() => setShowPopup(false)}
					anchor="top"
				>
					<Typography>{props.place.text}</Typography>
				</Popup>
			)}
		</>
	);
};

export default MyMarker;
