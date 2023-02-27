import React from 'react'
import { useState } from 'react'

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/users/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ username: email, password: password })

        })
            .then(data => console.log(data))
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type={"email"} id="username" onChange={(e) => setEmail(e.target.value)} />
                <input type={"password"} id="password" onChange={(e) => setPassword(e.target.value)} />
                <input type={"submit"} value="Register" />
            </form>
        </>
    )
}

export default Register