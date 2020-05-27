import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import schema from "../lib/schemas/signup";
import Link from "../components/shared/Link";

const useStyles = makeStyles(() => ({
	root: {
		height: "100vh",
	},
	title: {
		marginBottom: "32px",
	},
	fields: {
		width: "400px",
	},
}));

const Login = () => {
	const classes = useStyles();

	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<Box display="flex" alignItems="center" className={classes.root}>
			<Container maxWidth="sm">
				<Typography
					variant="h2"
					gutterBottom
					align="center"
					className={classes.title}
				>
					Signup
				</Typography>
				<Box mb={4}>
					<Formik
						initialValues={{
							name: "",
							email: "",
							phone: "",
							password: "",
							confirmPassword: "",
						}}
						validationSchema={schema}
						onSubmit={handleSubmit}
					>
						{({ submitForm, isSubmitting }) => (
							<Form>
								<Box display="flex" flexDirection="column" alignItems="center">
									<Box mb={2}>
										<Field
											component={TextField}
											name="name"
											label="Name"
											variant="outlined"
											className={classes.fields}
										/>
									</Box>
									<Box mb={2}>
										<Field
											component={TextField}
											name="email"
											type="email"
											label="Email"
											variant="outlined"
											className={classes.fields}
										/>
									</Box>
									<Box mb={2}>
										<Field
											component={TextField}
											name="phone"
											label="Phone"
											variant="outlined"
											className={classes.fields}
										/>
									</Box>
									<Box mb={2}>
										<Field
											component={TextField}
											name="password"
											type="password"
											label="Password"
											variant="outlined"
											className={classes.fields}
										/>
									</Box>
									<Box mb={4}>
										<Field
											component={TextField}
											name="confirmPassword"
											type="password"
											label="Confirm Password"
											variant="outlined"
											className={classes.fields}
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
				<Typography align="center">
					Already have an account? <Link href="/login">Login</Link>
				</Typography>
			</Container>
		</Box>
	);
};

export default Login;
