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
import {useUser} from "lib/hooks";

const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

const userType = () => {
	const [user] = useUser();


	React.useEffect(() => {
		if (user) {
			Router.replace("/");
		}
	}, [user]);

	type(user.type);
	console.log(type);

}

const Drawer = ({ open, handleClose }) => {
	const classes = useStyles();

	const [user, {mutate}] = useUser();

	if(user !== null) {
		if(user.type !== "user"){
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
								{["Home", "Establihment"].map((text, index) => (
									<ListItem button key={text}>
										<ListItemIcon>
											{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
										</ListItemIcon>
										<ListItemText primary={text} />
									</ListItem>
								))}
							</List>
							<Divider />
							<List>
								{["Promotions", "Events", "Reviews"].map((text, index) => (
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
		}
	}
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
						{["Home", "Profile", "Favorites"].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{["Groups", "Friends", "Events"].map((text, index) => (
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
