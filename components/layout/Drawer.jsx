import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MUIDrawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useUser } from "lib/hooks";
import ListItemLink from "components/shared/ListItemLink";

const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

const personLinks = [
	{
		href: "/profile",
		text: "My Profile",
	},
	{
		href: "/events",
		text: "My Events",
	},
	{
		href: "/groups",
		text: "My Groups",
	},
	{
		href: "/friends",
		text: "My Friends",
	},
	{
		href: "/userReviews",
		text: "My reviews",
	},
	{
		href: "/reviews",
		text: "Write a Review",
	},
];

const placeLinks = [
	{
		href: "/dashboard",
		text: "My Dashboard",
	},
	{
		href: "/events",
		text: "My Events",
	},
	{
		href: "/promotions",
		text: "My Promotions",
	},
];

const Drawer = ({ open, handleClose }) => {
	const classes = useStyles();

	const [user, { mutate }] = useUser();

	return (
		<div>
			<MUIDrawer open={open} onClose={handleClose}>
				<div
					className={classes.list}
					role="presentation"
					onClick={handleClose}
					onKeyDown={handleClose}
				>
					<List>
						<ListItemLink href={`/`}>Home</ListItemLink>
						{user?.type === "person" &&
							personLinks.map((link) => (
								<ListItemLink href={`${link.href}`} key={link.href}>
									{link.text}
								</ListItemLink>
							))}
						{user?.type === "place" &&
							placeLinks.map((link) => (
								<ListItemLink href={`${link.href}`} key={link.href}>
									{link.text}
								</ListItemLink>
							))}
					</List>
				</div>
			</MUIDrawer>
		</div>
	);
};

export default Drawer;
