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
	Tabs,
	Tab,
	AppBar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import Router from "next/router";
import SwipeableViews from "react-swipeable-views";
import MyEvents from "components/events/MyEvents";
import PublicEvents from "components/events/PublicEvents";
import TabPanel from "components/shared/TabPanel";
import Layout from "components/layout/Layout";
import { useUser } from "lib/hooks";

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
});

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const personTabs = ["Event invitations", "Public events"];
const placeTabs = [];

const Page = () => {
	const { data } = useSWR("/api/events?action=EVENTS", fetcher);
	const { data: dataPlaces } = useSWR("/api/places?action=ALL_PLACES", fetcher);
	const classes = useStyles();
	const [user] = useUser();
	const { enqueueSnackbar } = useSnackbar();
	const [openModal, setOpenModal] = React.useState(false);
	const [tab, setTab] = React.useState(0);

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

	const handleChangeTab = (event, newValue) => {
		setTab(newValue);
	};

	const handleChangeIndex = (index) => {
		setTab(index);
	};

	const handleSubmit = async (values, formik) => {
		try {
			const nEvent = {
				...values,
				type: "public",
				createdBy: user._id,
			};
			console.log(nEvent);
			const res = await fetch("/api/events?action=CREATE_EVENT", {
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
		} catch (e) {
			enqueueSnackbar(e.message, { variant: "error" });
		}
	};

	const allPlaces = dataPlaces?.places || [];
	const myEvents = data?.myEvents || [];
	const publicEvents = data?.publicEvents || [];

	const initialValues = (() => {
		if (user?.type === "person") {
			return {
				name: "",
				date: new Date(),
				description: "",
				place: "",
			};
		} else {
			return {
				name: "",
				date: new Date(),
				description: "",
			};
		}
	})();

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
				<Box mb={2}>
					<AppBar position="static" color="default">
						<Tabs
							value={tab}
							onChange={handleChangeTab}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
							aria-label="full width tabs example"
						>
							<Tab label="Events" {...a11yProps(0)} />
							{user?.type === "person" &&
								personTabs.map((t, i) => (
									<Tab key={t} label={t} {...a11yProps(i + 1)} />
								))}
							{user?.type === "place" &&
								placeTabs.map((t, i) => (
									<Tab key={t} label={t} {...a11yProps(i + 1)} />
								))}
						</Tabs>
					</AppBar>
				</Box>
				{user?.type === "person" && (
					<SwipeableViews index={tab} onChangeIndex={handleChangeIndex}>
						<TabPanel value={tab} index={0}>
							<MyEvents events={myEvents} user={user} />
						</TabPanel>
						<TabPanel value={tab} index={1}>
							Item Two
						</TabPanel>
						<TabPanel value={tab} index={2}>
							<PublicEvents events={publicEvents} user={user} />
						</TabPanel>
					</SwipeableViews>
				)}
				{user?.type === "place" && (
					<SwipeableViews index={tab} onChangeIndex={handleChangeIndex}>
						<TabPanel value={tab} index={0}>
							<MyEvents events={myEvents} user={user} />
						</TabPanel>
					</SwipeableViews>
				)}
			</Container>
			<Dialog
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby="form-dialog-title"
			>
				<Formik
					initialValues={initialValues}
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
									{user.type === "person" && (
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
									)}
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
