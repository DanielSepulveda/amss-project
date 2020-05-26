import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Drawer from "./Drawer";
import Footer from "./Footer";

const useStyles = makeStyles(() => ({
	root: {
		height: "100vh",
		maxWidth: "100vw",
	},
}));

const Layout = ({ children }) => {
	const [openDrawer, setOpenDrawer] = React.useState(false);

	const handleOpenDrawer = () => {
		setOpenDrawer(true);
	};

	const handleCloseDrawer = () => {
		setOpenDrawer(false);
	};

	const classes = useStyles();

	return (
		<Box className={classes.root} display="flex" flexDirection="column">
			<Header openDrawer={handleOpenDrawer} />
			<Drawer open={openDrawer} handleClose={handleCloseDrawer} />
			<Box flexGrow={1} my={4}>
				<main>{children}</main>
			</Box>
			<Footer />
		</Box>
	);
};

export default Layout;
