import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Layout from "../components/layout/Layout";
import ProTip from "../components/ProTip";
import Link from "../components/shared/Link";
import Copyright from "../components/Copyright";
import { get } from "https";



const getIds = async(req,res) =>{
    res = await fetch('http://localhost:3000/api/users/00c7e4fd-9b2e-40b6-9cb0-84a52348ff5c');
    const data = await res.json();
    return data;
}




const categories = async() =>{
    var Ids = await getIds();
    const res = await fetch('http://localhost:3000/api/cat/'+ Ids[1]);
    const {data} = await res.json();
    console.log(data);
    return {category: data};
  }

categories();


const Home = () => {
    
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
