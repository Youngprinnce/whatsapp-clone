import { Button } from '@material-ui/core'
import React, {useContext} from 'react'
import "./Login.css"
import { auth, provider } from "./firebase"
import { StateContext } from './StateProvider'



function Login() {

    const [user, setUser] = useContext(StateContext);

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result)
                return (
                    setUser(result)
            )})
            .catch((error)=>alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="" alt="" />
                <div className="login__Text">
                    <h1>Sign in to Whatsapp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
