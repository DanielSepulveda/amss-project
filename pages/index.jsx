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
import Map from "../components/shared/Map";


const Index = () => {

	const [user, { mutate }] = useUser();
	React.useEffect(() => {
		if (user) {
			alert(user);
		}
	}, [user]);
	console.log(user);
	return (
		<Layout>
			<Container>
				<Typography variant="h1" gutterBottom>
					Map
				</Typography>
				<Map />
			</Container>
		</Layout>
	);
};

export default Index;
