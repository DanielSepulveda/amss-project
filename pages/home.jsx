import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Layout from "../components/layout/Layout";
import ProTip from "../components/ProTip";
import Link from "../components/shared/Link";
import Copyright from "../components/Copyright";
import { get } from "https";
import { useUser } from "../lib/hooks";
import Router from "next/router";
import { useSnackbar } from "notistack";
import useSWR from 'swr';

const userCheck = () => {
	const [user] = useUser();
	React.useEffect(() => {
		if (user===null) {
			Router.replace("/login");
		}
	}, [user]);
}


const Home = () => {
	userCheck();
	//const [user, {mutate}] = useUser();
	//const { enqueueSnackbar } = useSnackbar();


	const categories = async() =>{
		const [user, {mutate}] = useUser();
		console.log(user);
		if(user){
			var id = user._id
			const res = await fetch('http://localhost:3000/api/' + id + '/categories');
			const {data} = await res.json();
			console.log(res);
			return {category: data};
		}
	  }

	categories();
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

export default Home;
