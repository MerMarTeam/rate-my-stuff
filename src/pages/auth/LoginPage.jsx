import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from './../../api'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleFormSubmit(event) {
        event.preventDefault()

        let newUser = {
            email: email,
            password: password,
        };

        api
            .post('/login', newUser)
            .then((response) => {
                const { accessToken, user } = response.data
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('userEmail', user.email)
                localStorage.setItem('userId', user.id)
            })
            .catch((error) => {
                console.log('Connection Failed' + '  ' + error);
            });

        // navigate('/');
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