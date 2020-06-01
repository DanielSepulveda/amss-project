import React from "react";
import {
	Container,
	Typography,
	Box,
	Grid,
	Button,
	Tabs,
	Tab,
	AppBar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import Layout from "components/layout/Layout";
import { useUser } from "lib/hooks";
import SwipeableViews from "react-swipeable-views";
import EventInfo from "components/events/EventInfo";
import EventAttending from "components/events/EventAttending";
import EventFriendsInvite from "components/events/EventFriendsInvite";
import TabPanel from "components/shared/TabPanel";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles(() => ({}));

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const Page = () => {
	const [user] = useUser();
	const Router = useRouter();
	const { data } = useSWR(
		`/api/events?action=EVENT&id=${Router.query.id}`,
		fetcher
	);

	const [tab, setTab] = React.useState(0);

	const classes = useStyles();

	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		if (!user && user !== undefined) {
			Router.replace("/");
		}
	}, [user]);

	if (!data) {
		return <Typography>Loading</Typography>;
	}

	const handleJoinEvent = () => {
		console.log("join event");
	};

	const handleChangeTab = (event, newValue) => {
		setTab(newValue);
	};

	const handleChangeIndex = (index) => {
		setTab(index);
	};

	const { event, peopleAttending } = data;

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
						Event
					</Typography>
					{user?.type === "person" && !data?.myEvent && (
						<Box>
							<Button
								onClick={handleJoinEvent}
								variant="contained"
								color="primary"
							>
								{data.attending ? "Leave Event" : "Join Event"}
							</Button>
						</Box>
					)}
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
							<Tab label="Event" {...a11yProps(0)} />
							<Tab label="Attending" {...a11yProps(1)} />
							{user?.type === "person" && (
								<Tab label="Invite Friends" {...a11yProps(2)} />
							)}
						</Tabs>
					</AppBar>
				</Box>
				{user?.type === "person" && (
					<SwipeableViews index={tab} onChangeIndex={handleChangeIndex}>
						<TabPanel value={tab} index={0}>
							<EventInfo event={event} />
						</TabPanel>
						<TabPanel value={tab} index={1}>
							<EventAttending attending={peopleAttending} />
						</TabPanel>
						<TabPanel value={tab} index={1}>
							<EventFriendsInvite friends={data.friends} />
						</TabPanel>
					</SwipeableViews>
				)}
				{user?.type === "place" && (
					<SwipeableViews index={tab} onChangeIndex={handleChangeIndex}>
						<TabPanel value={tab} index={0}>
							<EventInfo event={event} />
						</TabPanel>
						<TabPanel value={tab} index={1}>
							<EventAttending attending={peopleAttending} />
						</TabPanel>
					</SwipeableViews>
				)}
			</Container>
		</Layout>
	);
};

export default Page;
