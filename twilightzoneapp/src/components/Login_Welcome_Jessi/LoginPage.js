

function LoginPage() {
  return (
   
    <div className="App" >
      <header className="App-header">
        <img src={"the Twilight Zone.gif"} className = "gif" /> 
        
      </header>
      
      <p>Welcome To the Twilight Zone</p>
      <p>Please Join our hunt for the creepy things...Login or Sign Up</p>
      <div className="login-wrapper">
        
        <form>
          
          <label>
            <p>Username</p>
            <input type="text" />
          </label>
          <label>
            <p>Password</p>
            <input type="text" />
          </label>
          <div>
            <button type="Login">Log In</button>
            <p> "      Become a Member      "</p>
            <button type="SignUp">Sign Up</button>
            <p> " Leave the Twilight Zone "</p>
          </div>
          <div>
            <button type="DeleteAccount">Delete Your Account</button>
          </div>
          
        </form>
        </div>
        </div>
       
               
   )}

export default LoginPage;
