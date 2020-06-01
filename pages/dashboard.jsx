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
import Router from "next/router";

import Layout from "../components/layout/Layout";
import { useUser } from "../lib/hooks";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles(() => ({}));

const schema = yup.object().shape({
	categories: yup.array().of(yup.string()),
});

const Page = () => {
	const { data } = useSWR("/api/places?action=INFO", fetcher);
	const { data: dataCategories } = useSWR("/api/categories", fetcher);
	const classes = useStyles();
	const [user] = useUser();
	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		if (!user && user !== undefined) {
			Router.replace("/");
		}
		if (user) {
			if (user.type !== "place") {
				Router.replace("/");
			}
		}
	}, [user]);

	if (!data) {
		return <Typography>Loading</Typography>;
	}

	const handleSubmitCategories = async (values, formik) => {
		try {
			const res = await fetch("/api/places?action=UPDATE_CATEGORIES", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ categories: values.categories }),
			});

			if (!res.ok) throw new Error(await res.text());

			enqueueSnackbar("Categories updated", { variant: "success" });
			formik.resetForm();
			window.location.reload();
		} catch (e) {
			enqueueSnackbar(e.message, { variant: "error" });
		}
	};

	const place = data?.place || {};
	const allCategories = dataCategories?.categories || [];

	const selectedCategories = place.categories.map((c) => c._id);

	return (
		<Layout>
			<Container>
				<Typography variant="h3" gutterBottom>
					My Dashboard
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4" gutterBottom>
							Location
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Box>
									<Typography>Latitude</Typography>
									<Typography>{place.location.lat}</Typography>
								</Box>
							</Grid>
							<Grid item xs={6}>
								<Box>
									<Typography>Longitude</Typography>
									<Typography>{place.location.lng}</Typography>
								</Box>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Box>
							<Typography variant="h4" gutterBottom>
								Address
							</Typography>
							<Typography>{place.address}</Typography>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box>
							<Typography variant="h4" gutterBottom>
								Description
							</Typography>
							<Typography>{place.description}</Typography>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h4" gutterBottom>
							Categories
						</Typography>
						<Box>
							<Formik
								initialValues={{
									categories: selectedCategories,
								}}
								onSubmit={handleSubmitCategories}
								validationSchema={schema}
							>
								{({ submitForm, isSubmitting, setFieldValue, values }) => (
									<Form>
										<Box
											display="flex"
											flexDirection="column"
											alignItems="flex-start"
										>
											<FormControl component="fieldset">
												<FormGroup>
													{allCategories.map((category) => (
														<FormControlLabel
															key={category._id}
															control={
																<Checkbox
																	checked={
																		values.categories.findIndex(
																			(c) => c === category._id
																		) !== -1
																	}
																	onChange={(event) => {
																		let nCategories = values.categories;

																		if (event.target.checked) {
																			nCategories.push(category._id);
																		} else {
																			const idx = nCategories.findIndex(
																				(c) => c === category._id
																			);
																			nCategories.splice(idx, 1);
																		}

																		setFieldValue("categories", nCategories);
																	}}
																	name={category.name}
																/>
															}
															label={category.name}
														/>
													))}
												</FormGroup>
											</FormControl>
											<Box mt={2}>
												<Button
													variant="contained"
													color="primary"
													onClick={submitForm}
													disabled={isSubmitting}
												>
													Save
												</Button>
											</Box>
										</Box>
									</Form>
								)}
							</Formik>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Layout>
	);
};

export default Page;
