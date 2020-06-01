import React from "react";
import {
	Container,
	Typography,
	Box,
	Grid,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import Layout from "../components/layout/Layout";
import Map from "../components/shared/Map";
import PlacesList from "../components/map/PlacesList";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles(() => ({
	gridRoot: {
		height: 500,
		maxHeight: 500,
	},
	listRoot: {
		maxHeight: 500,
		overflow: "scroll",
	},
}));

const Index = () => {
	const { data } = useSWR("/api/places?action=PLACES", fetcher);
	const classes = useStyles();
	const [showPlace, setShowPlace] = React.useState("");
	const [mapCenter, setMapCenter] = React.useState({
		latitude: 25.678,
		longitude: -100.3133,
	});

	if (!data) {
		return <Typography>Loading</Typography>;
	}

	const handleClickPlace = (id) => {
		setShowPlace(id);
	};

	const handleClickList = (place) => {
		setShowPlace(place._id);
		setMapCenter({
			latitude: place.location.lat,
			longitude: place.location.lng,
		});
	};

	const handleSetMapCenter = (location) => {
		setMapCenter(location);
	};

	const places = data?.places || [];

	return (
		<Layout>
			<Container>
				<Typography variant="h3" gutterBottom>
					Map
				</Typography>
				<Grid container spacing={2} className={classes.gridRoot}>
					<Grid item>
						<List className={classes.listRoot}>
							{places.map((place) => (
								<PlacesList
									key={place._id}
									place={place}
									onClick={handleClickList}
								/>
							))}
						</List>
					</Grid>
					<Grid item xs={12} sm>
						<Map
							places={places}
							showPlace={showPlace}
							setShowPlace={handleClickPlace}
							mapCenter={mapCenter}
							setMapCenter={handleSetMapCenter}
						/>
					</Grid>
				</Grid>
			</Container>
		</Layout>
	);
};

export default Index;
