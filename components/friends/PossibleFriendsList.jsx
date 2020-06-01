import React from "react";
import { Box, Grid, List, ListItem, ListItemText } from "@material-ui/core";

const PossibleFriendsList = (props) => {
	const { friends } = props;

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Box>
					<List>
						{friends.map((f) => (
							<ListItem key={f._id}>
								<ListItemText primary={f.user.name} />
							</ListItem>
						))}
					</List>
				</Box>
			</Grid>
		</Grid>
	);
};

export default PossibleFriendsList;
