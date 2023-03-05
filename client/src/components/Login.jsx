import React from 'react'
import { useState } from 'react';
import { Stack, Button, TextField, Container, Typography } from '@mui/material';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //function to handle login
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
            .then(data => localStorage.setItem('authToken', data.token)) // set token received from api to localstorage to preserve session
    }

    return (
        <>

            <Container maxWidth={"sm"} sx={{ mt: 2 }}>
                <Stack direction={"column"} spacing={2}>
                    <Typography variant='h2'>Login</Typography>
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
                        Login
                    </Button>
                </Stack>
            </Container>
        </>
    )
}

export default Login