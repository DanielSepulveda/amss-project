import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
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
			</Head>
			<ThemeProvider theme={theme}>
				<SnackbarProvider maxSnack={3}>
					<CssBaseline />
					<Component {...pageProps} />
				</SnackbarProvider>
			</ThemeProvider>
		</React.Fragment>
	);
};

export default App;
