import React from "react";
import {
	Container,
	Typography,
	Box,
	Tabs,
	Tab,
	AppBar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import { useSnackbar } from "notistack";
import Router from "next/router";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "components/shared/TabPanel";
import FriendsList from "components/friends/FriendsList";
import PossibleFriendsList from "components/friends/PossibleFriendsList";

import Layout from "components/layout/Layout";
import { useUser } from "lib/hooks";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles(() => ({}));

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const Page = () => {
	const { data } = useSWR("/api/persons?action=FRIENDS", fetcher);
	const { data: dataCategories } = useSWR("/api/categories", fetcher);
	const classes = useStyles();
	const [user] = useUser();
	const { enqueueSnackbar } = useSnackbar();
	const [tab, setTab] = React.useState(0);

	React.useEffect(() => {
		if (!user && user !== undefined) {
			Router.replace("/");
		}
		if (user) {
			if (user.type !== "person") {
				Router.replace("/");
			}
		}
	}, [user]);

	if (!data) {
		return <Typography>Loading</Typography>;
	}

	const handleChangeTab = (event, newValue) => {
		setTab(newValue);
	};

	const handleChangeIndex = (index) => {
		setTab(index);
	};

	const { friends, possibleFriends } = data;

	return (
		<Layout>
			<Container>
				<Box mb={4}>
					<Typography variant="h3" gutterBottom>
						Friends
					</Typography>
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
							<Tab label="Friends" {...a11yProps(0)} />
							<Tab label="Possible Friends" {...a11yProps(0)} />
						</Tabs>
					</AppBar>
				</Box>
				<SwipeableViews index={tab} onChangeIndex={handleChangeIndex}>
					<TabPanel value={tab} index={0}>
						<FriendsList friends={friends} />
					</TabPanel>
					<TabPanel value={tab} index={1}>
						<PossibleFriendsList friends={possibleFriends} />
					</TabPanel>
				</SwipeableViews>
			</Container>
		</Layout>
	);
};

export default Page;
