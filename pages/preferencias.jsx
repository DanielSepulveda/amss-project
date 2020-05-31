import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Checkbox,
	Button,
	Typography,
} from "@material-ui/core";
import Layout from "components/layout/Layout";
import { useUser } from "../lib/hooks";
import Router from "next/router";
import { useSnackbar } from "notistack";
import useSWR from "swr";

var flag = false;

const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

const Page = () => {
	const [user] = useUser();
	const { data } = useSWR("/api/categories", fetcher);
	const { enqueueSnackbar } = useSnackbar();
	const [checked, setChecked] = React.useState([]);
	const classes = useStyles();

	React.useEffect(() => {
		if (!user && user !== undefined) {
			Router.replace("/login");
		}
	}, [user]);

	if (!data) {
		return <Typography>Loading...</Typography>;
	}

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value._id);
		const newChecked = [...checked];
		if (currentIndex === -1) {
			newChecked.push(value._id);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
	};

	const handleSubmit = async () => {
		var info = [...checked];
		var infoSend = { categories: info };
		infoSend = JSON.stringify(infoSend);
		try {
			const res = await fetch("/api/categories/setCategories", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: infoSend,
			});
			if (!res.ok) throw new Error(await res.text());
			enqueueSnackbar("Preferences Registered", { variant: "success" });
			flag = true;
		} catch (e) {
			enqueueSnackbar(e.message, { variant: "error" });
		}
	};

	const categories = data?.categories || [];

	console.log(categories);

	return (
		<Layout>
			<h1 style={{ textAlign: "center", fontSize: "2.5em", marginTop: "0" }}>
				Elige tus Preferencias
			</h1>
			<List style={{ width: "100%", overflow: "auto" }}>
				{categories.map((cat) => {
					const labelId = `checkbox-list-label-${cat}`;

					return (
						<ListItem
							key={cat._id}
							role={undefined}
							dense
							button
							onClick={handleToggle(cat)}
							style={{ width: "100%", textAlign: "center", overflow: "auto" }}
						>
							<ListItemIcon>
								<Checkbox
									style={{ marginLeft: "20%" }}
									edge="start"
									checked={checked.indexOf(cat._id) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={`Comida ${cat.name}`} />
						</ListItem>
					);
				})}
			</List>
			<div style={{ textAlign: "center", marginTop: "1em" }}>
				<Button
					style={{ fontSize: "2em", marginTop: "3em" }}
					variant="contained"
					color="secondary"
					onClick={handleSubmit}
				>
					Submit Preferences
				</Button>
			</div>
		</Layout>
	);
};

export default Page;
