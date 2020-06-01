import React from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import { format } from "date-fns";
import ReactMapGL, { Marker } from "react-map-gl";
import MarkerIcon from "@material-ui/icons/Room";

const EventInfo = (props) => {
	const { event } = props;

	const [viewport, setViewport] = React.useState({
		bearing: 0,
		pitch: 0,
		zoom: 14,
		latitude: event.place.location.lat,
		longitude: event.place.location.lng,
	});

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h4" gutterBottom>
					Information
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Box>
							<Typography variant="h5" gutterBottom>
								Name
							</Typography>
							<Typography>{event.name}</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box>
							<Typography variant="h5" gutterBottom>
								Date
							</Typography>
							<Typography>
								{format(new Date(event.date), "dd/MM/yyyy")}
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<Typography variant="h4" gutterBottom>
						Description
					</Typography>
					<Typography>{event.description}</Typography>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Box>
					<Typography variant="h4" gutterBottom>
						Place
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography variant="h5" gutterBottom>
								Description
							</Typography>
							<Typography>{event.place.description}</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="h5" gutterBottom>
								Address
							</Typography>
							<Typography>{event.place.address}</Typography>
						</Grid>
						<Grid item xs={12}>
							<ReactMapGL
								{...viewport}
								width="100%"
								height="500px"
								mapStyle="mapbox://styles/a01193911/ckaq4b8di01ja1inpy2zipxh5"
								onViewportChange={(viewport) => setViewport(viewport)}
								mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
							>
								<Marker
									longitude={event.place.location.lng}
									latitude={event.place.location.lat}
								>
									<div style={{ cursor: "pointer" }}>
										<MarkerIcon />
									</div>
								</Marker>
							</ReactMapGL>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
};

export default EventInfo;
