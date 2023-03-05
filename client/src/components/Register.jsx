import React from 'react'
import { useState } from 'react'
import { Stack, Button, TextField, Container, Typography } from '@mui/material';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //function to handle register
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
            <Container sx={{ mt: 2 }} maxWidth={"sm"}>
                <Stack spacing={2}>
                    <Typography variant='h2'>Register</Typography>

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
                </Stack>
            </Container>
        </>
    )
}

export default Register