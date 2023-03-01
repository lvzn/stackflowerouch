import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/users/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ username: email, password: password })

        })
            .then(res => res.json())
            .then(data => localStorage.setItem('authToken', data.token))
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="username"
                    label="Username"
                    type={"email"}
                    onChange={e => setEmail(e.target.value)}

                />
                <TextField
                    id="Password"
                    label="Password"
                    variant="outlined"
                    type='password'
                    onChange={e => setPassword(e.target.value)}

                />
                {/* <input type={"email"} id="username" onChange={(e) => setEmail(e.target.value)} />
                <input type={"password"} id="password" onChange={(e) => setPassword(e.target.value)} />
                <input type={"submit"} id="submit" /> */}
                <Button variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>
                    Login
                </Button>
            </form>
        </>
    )
}

export default Login