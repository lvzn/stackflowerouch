import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, AppBar, Toolbar, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'

function Appbar() {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant="h6">
                    <Button variant="text" color="inherit" component={Link} to={'/'}>
                        Home
                    </Button>
                    <Button variant="text" color="inherit" component={Link} to={'/login'}>
                        Login
                    </Button>
                    <Button variant="text" color="inherit" component={Link} to={'/register'}>
                        Register
                    </Button>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar