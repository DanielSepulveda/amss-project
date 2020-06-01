import React from "react";
import { Box, Grid, List, ListItem, ListItemText } from "@material-ui/core";

const EventAttending = (props) => {
	const { attending } = props;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box>
					<List>
						{attending.map((p) => (
							<ListItem key={p._id}>
								<ListItemText primary={p.user.name} />
							</ListItem>
						))}
					</List>
				</Box>
			</Grid>
		</Grid>
	);
};

export default EventAttending;
