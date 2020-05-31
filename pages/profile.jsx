import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Container,
	Box,
	Typography,
	Button,
	Checkbox,
	FormControlLabel,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import Router from "next/router";
import { useSnackbar } from "notistack";
import schema from "../lib/schemas/signup";
import Link from "../components/shared/Link";
import { useUser } from "../lib/hooks";

const Profile = () => {
    return (
        <div>
			hello world
		</div>
    );
};


export default Profile;