import './Login.css';

const Login = (props) => {
    let component;
    if (!props.showLoggedIn){
        component = (
            <div>
                <button onClick={props.onLoginClick}>Log in via spotify</button>
            </div>
    )} else {
        component = (
            <div>
                <h1>Welcome!</h1>
                <button onClick={props.onLoginClick}>Continue to app</button>
            </div>
        )
    }
    return(component)
}

export default Login;