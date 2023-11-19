import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from './../../api'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate();

    function handleFormSubmit(event) {
        event.preventDefault()

        let newUser = {
            email: email,
            password: password,
        };

        api
            .post('/login', newUser)
            .then((response) => {
                if (response.status == 200) {
                    const { accessToken, user } = response.data
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('userEmail', user.email)
                    localStorage.setItem('userId', user.id)
                    console.log("Login successfull")
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log('Connection Failed' + '  ' + error);
                const errorResponse = error.response
                if (errorResponse.data) console.log(errorResponse.data)
            });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email-input">Email: </label>
                <input type="text" id="email-input" required value={email} onChange={event => setEmail(event.target.value)} />

                <label htmlFor="password-input">Password: </label>
                <input type="password" id="password-input" required value={password} onChange={event => setPassword(event.target.value)} />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LoginPage;