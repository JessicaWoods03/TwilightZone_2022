import './App1.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {TZTheme, useStyles} from '../../styles/TZTheme';
import { ThemeProvider } from '@material-ui/styles';
import { render } from '@testing-library/react';
import React, {useState} from 'react';
import {Container, Typography, Card, CardHeader, CardContent} from '@material-ui/core';
import { TitleBox } from './Title';

//Still working on this....part  pushing what I got-
function NewUserAccountForm(){
    const Initallist = [
        {
            first_name: 'Jessica',
            last_name: 'Woods',
            user_name: 'woodytest',
            password: 'password'
        },
    ];  
const [list, setList] = React.useState(Initallist);
const [first_name, last_name, user_name, password, setName] = React.useState('');
const classes = useStyles(TZTheme);
 function handChange(event) {
   //tracks input state
   setName(event.target.value);
 };   
 function handleAdd() {
     //add new user
    const newList = list.concat({ first_name, last_name, user_name, password });
    setList(newList);
    setName('');
 };
    return(
    <ThemeProvider theme={TZTheme}>
    <Container className={classes.page} >
    <TitleBox section="newuser" noAnimate={true} maxSize={180}/>

       
    <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
        Please Fill Out Your Spooky Details Below.
    </Typography>
            <form  >
            
            <div>
            <label><p>First Name:</p></label>
            <input type="first_name" placeholder="First Name" value={first_name} id="first_name" onChange={handChange}/>
            </div>
            <div>
            <label><p>Last Name:</p></label>
            <input type="last_name" placeholder="Last Name" value={last_name} id="last_name" onChange={handChange} />
            </div>
            <div>
            <label><p>Username:</p></label>
            <input type="username" placeholder="Username" value={user_name} id="username" onChange={handChange}/>
            </div>
            <div>
            <label><p>Password:</p></label>
            <input type="password" placeholder="password" value={password} id="password" onChange={handChange}/>
             </div> 
             
             <div> 
            <input type="submit" value="Register"  onClick={handleAdd}/> 
            </div>
            
        </form>
       <div>
           {list.map((item) => (
               <li key={item.id}>{item.first_name}</li>
           ))}
       </div>
    </Container>
   </ThemeProvider>
    )
}
export default NewUserAccountForm;