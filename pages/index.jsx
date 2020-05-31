import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Layout from "../components/layout/Layout";
import ProTip from "../components/ProTip";
import Link from "../components/shared/Link";
import Copyright from "../components/Copyright";
import { useUser } from "../lib/hooks";
import Router from "next/router";


const Index = () => {

	const [user, { mutate }] = useUser();
	React.useEffect(() => {
		if (user) {
			console.log(user);
		}
	}, [user]);
	console.log(user);
	return (
		<Layout>
			<Container>
				<Typography variant="h4" component="h1" gutterBottom>
					Next.js example
				</Typography>
				<Link href="/about" color="secondary">
					Go to the about page
				</Link>
				<ProTip />
				<Copyright />
			</Container>
		</Layout>
	);
};

export default Index;
