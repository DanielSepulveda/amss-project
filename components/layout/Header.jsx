import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "../shared/Link";
import { useUser } from "../../lib/hooks";

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Header = ({ openDrawer }) => {
	const [user, { mutate }] = useUser();

	const handleLogout = async () => {
		await fetch("/api/auth", {
			method: "DELETE",
		});

		mutate(null);
	};

	const classes = useStyles();

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={openDrawer}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						AMSS
					</Typography>
					{user ? (
						<Button color="inherit" onClick={handleLogout}>
							Logout
						</Button>
					) : (
						<Button color="inherit" component={Link} naked href="/login">
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
