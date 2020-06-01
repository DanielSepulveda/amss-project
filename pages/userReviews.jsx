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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useSWR from "swr";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import Layout from "../components/layout/Layout";
import { useUser } from "../lib/hooks";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
}));


const Page = () =>{
    const classes = useStyles();
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
    
    if(reviews){
    return (
        <Layout>
            <h1 style={{textAlign:"center"}}>Mis Reseñas</h1>
            {reviews.map((review) =>{
                return(
                <Card className={classes.root} style={{margin:"10px"}}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="p" component="h2">
                            Reseña
                        </Typography>
                        <Typography gutterBottom variant="p" component="h3">
                            Lugar: {review.place}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {review.content}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Share (NA for the moment)
                        </Button>
                       
                    </CardActions>
            </Card>);
            })}
            
        </Layout>
      );}
      else{
        return <Typography>Loading</Typography>;
      }
}


export default Page;