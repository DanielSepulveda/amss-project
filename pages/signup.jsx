import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Container,
	Box,
	Typography,
	Button,
	Checkbox,
	FormControlLabel,
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

			mutate(userObj);
		} catch (e) {
			enqueueSnackbar(e.message, { variant: "error" });
		}
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
							bday: "",
							password: "",
							confirmPassword: "",
							type: "user",
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
											name="bday"
											label="Birthday"
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
									<Box mb={4}>
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
																}
															}}
															checked={field.value === "place"}
															name="type"
															color="primary"
														/>
													}
													label="Usuario Establecimiento"
												/>
											)}
										</Field>
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
