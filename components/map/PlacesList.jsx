import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

const PlacesList = (props) => {
	const handleClick = () => {
		props.onClick(props.place);
	};

	const { place } = props;

	return (
		<ListItem button key={place._id} onClick={handleClick}>
			<ListItemText primary={place.description} />
		</ListItem>
	);
};

export default PlacesList;
