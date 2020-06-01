import React from "react";
import {
	Container,
	Typography,
	Box,
	Grid,
	FormControl,
	FormControlLabel,
	FormGroup,
	Checkbox,
	Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import Link from "../components/shared/Link";
import Layout from "../components/layout/Layout";
import { useUser } from "../lib/hooks";
import { TextField } from "formik-material-ui";


const useStyles = makeStyles(() => ({
	root: {
		height: "40vh",
	},
	title: {
		marginBottom: "32px",
	},
	fields: {
		width: "500px",
	},
	fieldmessage:{
		width: "500px"
	}
}));

const Review = () =>{
    const [user, { mutate }] = useUser();
	const { enqueueSnackbar } = useSnackbar();

	
	React.useEffect(() => {
		if (!user && user !== undefined) {
			Router.replace("/login");
		}
	}, [user]);

	const handleSubmit= async (values) =>{
		console.log(values);
		
		var infoSend = {person: user._id,
						content: values.message,
						place: values._id,
						date: Date.now()				
		} 
		infoSend = JSON.stringify(infoSend);
		console.log(infoSend);
		try {
			const res = await fetch("/api/reviews", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: infoSend,
			});

			if (!res.ok) throw new Error(await res.text());

			enqueueSnackbar("Review Registered Correctly", { variant: "success" });

		} catch (e) {
			enqueueSnackbar("Error in review registering, please try later", { variant: "error" });
		}

	};

	const classes = useStyles();
    return(
        <Layout>
            <h1 style={{ textAlign: "center", fontSize: "2.5em", marginTop: "0" }}>
				Escribe una Reseña
			</h1>
            <Box display="flex" alignItems="center" className={classes.root}>
			<Container >
				
				<Box mb={4}>
					<Formik
						initialValues={{
							_id: "",
							message: "",
						}}
						
						onSubmit={handleSubmit}
					>
						{({ submitForm, isSubmitting }) => (
							<Form>
								<Box display="flex" flexDirection="column" alignItems="center"
								style={{marginTop:"15em"}}>
									<Box mb={2}>
										<Field 
											component={TextField}
											name="_id"
											type="text"
											label="Place Id"
											variant="outlined"
											className={classes.fields}
											
										/>
									</Box>
									<Box  style={{marginBottom:"4em"}}>
										<Field 
											style={{height: "300px", fontSize:"2em"}}
											name="message"
											type="text"
											label="message"
											variant="outlined"
											className={classes.fieldmessage}
										/>
									</Box>
									<Button
										variant="contained"
										color="primary"
										onClick={submitForm}
										disabled={isSubmitting}
									>
										Submit
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				</Box>
			</Container>
		</Box>
        </Layout>
    );
};

export default Review;