import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Container,
	Box,
	Typography,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Router from "next/router";
import { useSnackbar } from "notistack";
import schema from "../lib/schemas/signup";
import Link from "../components/shared/Link";
import { useUser } from "../lib/hooks";

const useStyles = makeStyles(() => ({
	root: {
		marginTop: 32,
		marginBottom: 32,
	},
	title: {
		marginBottom: "32px",
	},
	fields: {
		width: "400px",
	},
	fields100: {
		width: "100%",
	},
}));

const Login = () => {
	const classes = useStyles();
	const [user, { mutate }] = useUser();
	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		if (user) {
			Router.replace("/");
		}
	}, [user]);

	const handleSubmit = async (values) => {
		try {
			const res = await fetch("/api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!res.ok) throw new Error(await res.text());

			const userObj = await res.json();

			enqueueSnackbar("Signup successful", { variant: "success" });
			Router.push("/preferencias");

			mutate(userObj);
		} catch (e) {
			enqueueSnackbar(e.message, { variant: "error" });
		}
	};

	return (
		<Box display="flex" alignItems="center">
			<Container maxWidth="sm" className={classes.root}>
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
							type: "person",
							lat: 0,
							lng: 0,
							description: "",
							address: "",
						}}
						validationSchema={schema}
						onSubmit={handleSubmit}
					>
						{({ submitForm, isSubmitting, values }) => (
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
									<Box mb={2}>
										<Field
											component={TextField}
											name="confirmPassword"
											type="password"
											label="Confirm Password"
											variant="outlined"
											className={classes.fields}
										/>
									</Box>
									<Box mb={2}>
										<Field name="type">
											{({ field, form }) => (
												<FormControlLabel
													control={
														<Checkbox
															onChange={(event) => {
																if (event.target.checked) {
																	form.setFieldValue("type", "place");
																} else {
																	form.setFieldValue("type", "user");
																	form.setFieldError("lat", "");
																	form.setFieldError("lng", "");
																	form.setFieldError("description", "");
																	form.setFieldError("address", "");
																}
															}}
															checked={field.value === "place"}
															name="type"
															color="primary"
														/>
													}
													label="Place?"
												/>
											)}
										</Field>
									</Box>
									{values.type === "place" && (
										<Box mb={2}>
											<Grid spacing={2} container>
												<Grid item xs={6}>
													<Field
														component={TextField}
														name="lat"
														type="number"
														label="Latitude"
														variant="outlined"
														className={classes.fields100}
													/>
												</Grid>
												<Grid item xs={6}>
													<Field
														component={TextField}
														name="lng"
														type="number"
														label="Longitude"
														variant="outlined"
														className={classes.fields100}
													/>
												</Grid>
												<Grid item xs={12}>
													<Field
														component={TextField}
														name="address"
														type="text"
														label="Address"
														variant="outlined"
														className={classes.fields100}
													/>
												</Grid>
												<Grid item xs={12}>
													<Field
														component={TextField}
														name="description"
														type="text"
														label="Description"
														variant="outlined"
														className={classes.fields100}
													/>
												</Grid>
											</Grid>
										</Box>
									)}
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
