import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Layout from 'components/layout/Layout';
import {Button} from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

//verificar que hay un usario conectado
const user = ()=>{
  const [user] = useUser();


	React.useEffect(() => {
		if (!user) {
			Router.replace("/login");
		}
	}, [user]);
}



CheckboxList.getInitialProps = async() =>{
  const res = await fetch('http://localhost:3000/api/category');
  const {data} = await res.json();
  
  return {category: data};
}

//const [user, {mutate}] = useUser();

export default function CheckboxList({category}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

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

  //mandar la forma
  const handleSubmit = async() =>{
    try {
			const res = await fetch("/api/users/", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: {
          likes: JSON.stringify(checked)
        },
			});

			if (!res.ok) throw new Error(await res.text());

			const userObj = await res.json();

			enqueueSnackbar("Signup successful", { variant: "success" });

			mutate(userObj);
		} catch (e) {
			enqueueSnackbar(e.message, { variant: "error" });
		}
  }



  return (
    <Layout>
        <h1 style={{textAlign:"center", fontSize:"2.5em", marginTop:"0"}}>Elige tus Preferencias</h1>
            <List style={{width:"100%", overflow:"auto"}}>
                {category.map((cat) => { 
                    const labelId = `checkbox-list-label-${cat}`;

                    return (
                    <ListItem key={cat._id} role={undefined} dense button onClick={handleToggle(cat)} 
                    style={{width:"100%", textAlign:"center", overflow:"auto"}}>
                        <ListItemIcon>
                        <Checkbox
                            style={{marginLeft:"20%"}}
                            edge="start"
                            checked={checked.indexOf(cat._id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`Comida ${cat.nameCategory}`} />
                    </ListItem>
                    );
                })}
                
            </List>
            <div style={{textAlign:"center", marginTop:"1em"}}>
                    <Button style={{fontSize:"2em", marginTop:"3em"}} variant="contained" color="secondary" 
                      onClick={handleSubmit}
                      >
                        Submit Preferences
                    </Button>
            </div>
          
       
    </Layout>
  );
}