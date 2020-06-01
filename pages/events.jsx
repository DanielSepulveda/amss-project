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
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	MenuItem,
	InputLabel,
	Card,
	CardContent,
	CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { format } from "date-fns";

import Layout from "../components/layout/Layout";
import { useUser } from "../lib/hooks";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles(() => ({
	fields: {
		width: "400px",
	},
	cardTitle: {
		fontStyle: "bold",
	},
}));

const schema = yup.object().shape({
	name: yup.string().required("Please add a name"),
	date: yup.date().required("Please add a date"),
	description: yup.string().required("Please add a description"),
	place: yup.string().required("Please add a place"),
});

const Page = () => {
	const { data } = useSWR("/api/events?action=EVENTS", fetcher);
	const { data: dataPlaces } = useSWR("/api/places?action=ALL_PLACES", fetcher);
	const classes = useStyles();
	const [user] = useUser();
	const { enqueueSnackbar } = useSnackbar();
	const [openModal, setOpenModal] = React.useState(false);

	React.useEffect(() => {
		if (!user && user !== undefined) {
			Router.replace("/");
		}
	}, [user]);

	if (!data) {
		return <Typography>Loading</Typography>;
	}

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleSubmit = async (values, formik) => {
		try {
			if (user.type === "person") {
				const nEvent = {
					...values,
					type: "public",
					createdBy: user._id,
				};
				console.log(nEvent);
				const res = await fetch("/api/events?action=CREATE_PERSON_EVENT", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(nEvent),
				});

				if (!res.ok) throw new Error(await res.text());

				enqueueSnackbar("Event created", { variant: "success" });
				formik.resetForm();
				window.location.reload();
			}
		} catch (e) {
			enqueueSnackbar(e.message, { variant: "error" });
		}
	};

	console.log(data);
	console.log(dataPlaces);

	const allPlaces = dataPlaces?.places || [];
	const myEvents = data?.events || [];

	return (
		<Layout>
			<Container>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					mb={4}
				>
					<Typography variant="h3" gutterBottom>
						My Events
					</Typography>
					<Box ml={2}>
						<Button
							onClick={handleOpenModal}
							variant="contained"
							color="primary"
						>
							Create Event
						</Button>
					</Box>
				</Box>
				<Grid container spacing={2}>
					{myEvents.map((e) => (
						<Grid item xs={3} key={e._id}>
							<Card>
								<CardContent>
									<Typography
										variant="h5"
										gutterBottom
										className={classes.cardTitle}
										align="center"
									>
										{e.name}
									</Typography>
									<Typography gutterBottom color="textSecondary">
										{e.place.description}
									</Typography>
									<Typography gutterBottom>{e.description}</Typography>
									<Typography>
										{format(new Date(e.date), "dd/MM/yyyy")}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">More information</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
			<Dialog
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby="form-dialog-title"
			>
				<Formik
					initialValues={{
						name: "",
						date: new Date(),
						description: "",
						place: "",
					}}
					validationSchema={schema}
					onSubmit={handleSubmit}
				>
					{({ submitForm, isSubmitting }) => (
						<Form>
							<DialogTitle id="form-dialog-title">Create Event</DialogTitle>
							<DialogContent>
								<DialogContentText>
									To create an event, please fill out the form below.
								</DialogContentText>
								<Box display="flex" flexDirection="column" alignItems="center">
									<Box mb={2}>
										<Field
											component={TextField}
											name="name"
											type="text"
											label="Name"
											variant="outlined"
											className={classes.fields}
										/>
									</Box>
									<Box mb={2}>
										<Field
											component={TextField}
											name="description"
											type="text"
											label="Description"
											variant="outlined"
											className={classes.fields}
										/>
									</Box>
									<Box mb={2}>
										<Field
											component={DatePicker}
											name="date"
											label="Date"
											variant="inline"
											inputVariant="outlined"
											format="dd/MM/yyyy"
											className={classes.fields}
										/>
									</Box>
									<Box>
										<InputLabel htmlFor="place-select">Place</InputLabel>
										<Field
											component={Select}
											name="place"
											inputProps={{
												id: "place-select",
											}}
											variant="outlined"
											className={classes.fields}
										>
											{allPlaces.map((p) => (
												<MenuItem key={p._id} value={p._id}>
													{p.description}
												</MenuItem>
											))}
										</Field>
									</Box>
								</Box>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleCloseModal} color="primary">
									Cancel
								</Button>
								<Button
									onClick={submitForm}
									color="primary"
									disabled={isSubmitting}
								>
									Submit
								</Button>
							</DialogActions>
						</Form>
					)}
				</Formik>
			</Dialog>
		</Layout>
	);
};

export default Page;
