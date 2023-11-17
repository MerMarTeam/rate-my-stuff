import { useState } from "react";

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleFormSubmit(event) {
        console.log(email, password)
    }

    return (
        <div>
            <form action="submit">
                <label htmlFor="email-input">Email: </label>
                <input type="text" id="email-input" required value={email} onChange={event => setEmail(event.target.value)} />

                <label htmlFor="password-input">Password: </label>
                <input type="password" id="password-input" required value={email} onChange={event => setPassword(event.target.value)} />

                <button type="submit" onClick={handleFormSubmit}></button>
            </form>
        </div>
    )
}

export default LoginPage;