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
import Layout from "../components/layout/Layout";
import { useUser } from "../lib/hooks";

const useStyles = makeStyles(() => ({}));

const Page = () =>{
    const [user] = useUser();
	const { enqueueSnackbar } = useSnackbar();
	
    const fetcher = (url) => fetch(url).then((r) => r.json());
	
	React.useEffect(() => {
		if (!user && user !== undefined) {
			Router.replace("/login");
		}
    }, [user]);

    const {data} = useSWR("/api/reviews?action=USER", fetcher);

    if (!data) {
		return <Typography>Loading</Typography>;
	}
    
    const reviews = data?.reviews || {};
   
    console.log(reviews);
    return(
        <Layout>

        </Layout>
    );
}


export default Page;