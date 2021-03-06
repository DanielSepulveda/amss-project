import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import "mapbox-gl/dist/mapbox-gl.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import theme from "../lib/theme";

const App = ({ Component, pageProps }) => {
	React.useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Amss Project</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link
					href="https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css"
					rel="stylesheet"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<SnackbarProvider maxSnack={3}>
						<CssBaseline />
						<Component {...pageProps} />
					</SnackbarProvider>
				</MuiPickersUtilsProvider>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default App;
