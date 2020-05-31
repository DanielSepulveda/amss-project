import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Layout from "../components/layout/Layout";
import Map from "../components/shared/Map";

const Index = () => {
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
