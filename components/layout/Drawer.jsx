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
import ListItemLink from "../shared/ListItemLink";

const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

const Drawer = ({ open, handleClose }) => {
	const classes = useStyles();

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
						{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
						<ListItemLink href="/login">
							<ListItemIcon>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary="TestLink" />
						</ListItemLink>
					</List>
					<Divider />
					<List>
						{["All mail", "Trash", "Spam"].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</div>
			</MUIDrawer>
		</div>
	);
};

export default Drawer;
