import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

const useStyles = makeStyles(() => ({
	root: {
		backgroundColor: blueGrey[400],
		color: "#fff",
	},
	container: {
		marginTop: "16px",
		marginBottom: "16px",
	},
}));

const Footer = () => {
	const classes = useStyles();
	return (
		<footer className={classes.root}>
			<Container className={classes.container}>Footer</Container>
		</footer>
	);
};

export default Footer;
