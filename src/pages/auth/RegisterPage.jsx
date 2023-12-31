import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from './../../api'

function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleFormSubmit(event) {
        event.preventDefault()

        let newUser = {
            email: email,
            password: password,
        };

        api
            .post('/register/', newUser)
            .then((response) => {
                console.log(response)
                navigate('/');
            })
            .catch((error) => {
                console.log('Connection Failed' + '  ' + error);
            });
    }

    return (
        <div>
            <h1>Register new user</h1>
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

export default RegisterPage;