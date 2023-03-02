import React from 'react'
import { useState } from 'react'
import { TextField, Button } from '@mui/material';

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
    }

    return (
        <>
            <h1>Register</h1>
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
                <Button variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>
                    Register
                </Button>
            </form>
        </>
    )
}

export default Register