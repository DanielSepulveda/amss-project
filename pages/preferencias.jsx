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

const handleSubmit = async() =>{
  try{

  }catch(error){

  }
}

CheckboxList.getInitialProps = async() =>{
  const res = await fetch('http://localhost:3000/api/category');
  const {data} = await res.json();

  return {category: data};
}



export default function CheckboxList({category}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Layout>
        <h1 style={{textAlign:"center", fontSize:"2.5em", marginTop:"0"}}>Elige tus Preferencias</h1>
        
        <List style={{width:"100%", overflow:"auto"}}>
            {category.map((cat) => { 
                const labelId = `checkbox-list-label-${cat}`;

                return (
                <ListItem key={cat} role={undefined} dense button onClick={handleToggle(cat)} 
                style={{width:"100%", textAlign:"center", overflow:"auto"}}>
                    <ListItemIcon>
                    <Checkbox
                        style={{marginLeft:"40%"}}
                        edge="start"
                        checked={checked.indexOf(cat) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${cat.nameCategory}`} />
                </ListItem>
                );
            })}
            <div style={{textAlign:"center", marginTop:"1em"}}>
                <Button style={{fontSize:"2em"}} variant="contained" color="secondary" >
                    Submit Preferences
                </Button>
            </div>
            
        </List>
    
    </Layout>
  );
}