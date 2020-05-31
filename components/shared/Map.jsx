import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import geocodeService from "@mapbox/mapbox-sdk/services/geocoding";
import debounce from "lib/debounce";
import Markers from "../map/Markers";

const geocodeClient = geocodeService({
	accessToken:
		"pk.eyJ1IjoiYTAxMTkzOTExIiwiYSI6ImNrYXExNTA2YzA1Z3gycmxnbzJzbzVrdG4ifQ.tf47f5cViqBN0lrj43Z8Mg",
});

const Map = (props) => {
	const [viewport, setViewport] = React.useState({
		bearing: 0,
		pitch: 0,
		zoom: 14,
	});
	const [dataMarkers, setDataMarkers] = React.useState([]);

	React.useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log(position);
				props.setMapCenter({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				// setViewport({
				// 	...viewport,
				// 	latitude: position.coords.latitude,
				// 	longitude: position.coords.longitude,
				// });
			},
			(error) => {
				console.log(error);
			},
			{ maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
		);
	}, []);

	// const debouncedFetch = React.useCallback(
	// 	debounce((long, lat) => {
	// 		geocodeClient
	// 			.forwardGeocode({
	// 				query: "restaurant, food",
	// 				proximity: [long, lat],
	// 				bbox: [long - 0.01, lat - 0.01, long + 0.01, lat + 0.01],
	// 				types: ["poi"],
	// 				limit: 7,
	// 			})
	// 			.send()
	// 			.then((response) => {
	// 				const matches = response.body;

	// 				setDataMarkers(matches.features);
	// 			});
	// 	}, 750),
	// 	[]
	// );

	const handleViewport = (viewport) => {
		setViewport(viewport);
		props.setMapCenter({
			latitude: viewport.latitude,
			longitude: viewport.longitude,
		});
		// debouncedFetch(viewport.longitude, viewport.latitude);
	};

	const { places } = props;

	return (
		<ReactMapGL
			{...viewport}
			{...props.mapCenter}
			width="100%"
			height="500px"
			mapStyle="mapbox://styles/a01193911/ckaq4b8di01ja1inpy2zipxh5"
			onViewportChange={handleViewport}
			mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
		>
			<Markers
				data={places}
				showPlace={props.showPlace}
				setShowPlace={props.setShowPlace}
			/>
		</ReactMapGL>
	);
};

export default Map;
