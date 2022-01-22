
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
//integrated from Evans_branch styles in css Nov. 12, 2021
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import './styles.css';
axios.defaults.withCredentials = true;



  
  function HomePage() {
    //updated integration from login_branch Nov. 9th 2021
    const userList = [{
      first_name: "Jessica",
      last_name: "Woods",
      username: "woody",
      password: "password"
    },
    {
    first_name: "Gigi",
    last_name: "Testing",
    username: "gigi_testing",
    password: "password"
    }
  ];
   //const idems to set and get
    const [list, setList] = React.useState(userList);
    const [user, setUser] = useState({username:"", password:""});
     const[error, setError] = useState("");

     //testing middlewear
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordRed, setPasswordReg] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

  

    
    //function for login
    const Login =details =>{
      console.log(details);
      if(details.username == userList.username && details.password == userList.password){
        console.log("Loggin In");
        setUser({
          username: details.username,
          password: details.password
        });
      }else {
        console.log("Creepy...something went wrong!");
        setError("Creepy...something went wrong!");
      }
  
    };
    //function for logout
    const Logout = () => {
      console.log("Logged Out");
      setUser({username:"", password:""})
      
    };
    const [details, setDetails]= useState({username:"",password:""});
    const submitHandler = e => {
      e.preventDefault();
      Login(details);
    };
  
    //Delete functionality
    function handleRemoveItem (username){
      const newList = list.filter((user) => user.username !== username);
 
    setList(newList);
     };





     //Working with middlewear Axios
     //move this one over to newUserAccount.js page in the morning...super sleepy-
     //fix the routes to the new user page-
     const register = () => {
      //I need to look that up 
      axios.post("http://localhost:5000/register", {
        username: usernameReg,
        password: passwordRed,
      }).then((response)=> {
        console.log(response);
      });
     }
    
      function login_testing() {
         axios.post("http://localhost:5000/login", {
           username: username,
           password: password,
         }).then((response) => {
           if (!response.data.message) {
             setLoginStatus(response.data.message);
           } else {
             console.log(response.data);
             setLoginStatus(response.data[0].username);
           }
         });
       }

  
    return (
      //Integrating Evans_branch styles in css. Nov. 12th, 2021
      
      <div className="HomePage">
      <Box sx={{ padding: 2 }}>
        <img src={"the Twilight Zone.gif"} className="gif" />
      </Box>

      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">
          Welcome To the Twilight Zone 🦇
        </Typography>

        <Typography variant="h5">
          Join our hunt for the creepy things 👻
        </Typography>
      </Box>

      {/* Will only show the div if user is logged out */}
      {!user.username && <Box sx={{ padding: 2 }}>
        <form onSubmit={submitHandler} autoComplete="off">
          <TextField sx={{ margin: 1 }} id="username" label="Username" variant="outlined" onChange={e => setUsername( e.target.value )} defaultValue={details.username} />
          <TextField sx={{ margin: 1 }} id="password" label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} defaultValue={details.password} />
          {/** I see that LOL- I am working on it Evan...If I can get it to work...might need help */}
          <Button type="submit" variant="contained" color="primary" id="btn" size="medium" onClick={() => { login_testing()}}>Log In</Button>
          <Link to="./newUser" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary" id="btnSecondary" size="medium">Sign Up</Button></Link>
        </form>
      </Box>}


      {/* Only show div if user is logged in */}
      {user.username && <Box sx={{ padding: 2 }}>
        <div className="logged-in-wrapper">
          <h2>Welcome, <span>{user.username}</span></h2>
          <Button variant="contained" size="medium" color="primary" id="btn" onClick={Logout}>Logout</Button>

          <div>
            <Button variant="contained" size="small" color="primary" id="btnSecondary" onClick={() => { alert("Implement me") }}>Delete Account</Button>
          </div>
        </div>
      </Box>}
    
          </div>
                
     )}
    
  
  export default HomePage;