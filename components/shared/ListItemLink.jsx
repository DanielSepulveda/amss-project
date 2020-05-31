import React from "react";
import NextLink from "next/link";
import ListItem from "@material-ui/core/ListItem";

function ListItemLink(props) {
	return (
		<NextLink href={props.href} passHref>
			<ListItem button component="a" {...props} />
		</NextLink>
	);
}

export default ListItemLink;