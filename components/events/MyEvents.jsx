import React from "react";
import { Grid } from "@material-ui/core";

import EventCard from "./EventCard";

const MyEvents = (props) => {
	const { events, user } = props;

	return (
		<Grid container spacing={2}>
			{events.map((e) => (
				<Grid item xs={3} key={e._id}>
					<EventCard event={e} showDesc={user.type === "person"} />
				</Grid>
			))}
		</Grid>
	);
};

export default MyEvents;
