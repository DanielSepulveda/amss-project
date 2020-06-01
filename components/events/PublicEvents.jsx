import React from "react";
import { Grid } from "@material-ui/core";

import EventCard from "./EventCard";

const PublicEvents = (props) => {
	const { events, user } = props;

	return (
		<Grid container spacing={2}>
			{events.map((e) => (
				<Grid item xs={3} key={e._id}>
					<EventCard event={e} showDesc />
				</Grid>
			))}
		</Grid>
	);
};

export default PublicEvents;
