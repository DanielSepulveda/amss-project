import React from "react";
import {
	Typography,
	Card,
	CardContent,
	CardActions,
	Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import NextLink from "next/link";

const useStyles = makeStyles(() => ({
	cardTitle: {
		fontStyle: "bold",
	},
}));

const EventCard = (props) => {
	const { event, showDesc } = props;

	const classes = useStyles();
	return (
		<Card>
			<CardContent>
				<Typography
					variant="h5"
					gutterBottom
					className={classes.cardTitle}
					align="center"
				>
					{event.name}
				</Typography>
				{showDesc && (
					<Typography gutterBottom color="textSecondary">
						{event.place.description}
					</Typography>
				)}
				<Typography gutterBottom>{event.description}</Typography>
				<Typography>{format(new Date(event.date), "dd/MM/yyyy")}</Typography>
			</CardContent>
			<CardActions>
				<NextLink href={`/events/${event._id}`} passHref>
					<Button size="small">More information</Button>
				</NextLink>
			</CardActions>
		</Card>
	);
};

export default EventCard;
