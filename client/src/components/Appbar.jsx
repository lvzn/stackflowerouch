import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, AppBar, Toolbar, } from '@mui/material'

//appbar component
function Appbar() {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant="h6">
                    <Button variant="text" color="inherit" component={Link} to={'/'}> {/* Button with Link component  from react router that directs to site root path */}
                        Home
                    </Button>
                    <Button variant="text" color="inherit" component={Link} to={'/login'}> {/* Similar to above but redirects to /login */}
                        Login
                    </Button>
                    <Button variant="text" color="inherit" component={Link} to={'/register'}> {/* Similar but to /register */}
                        Register
                    </Button>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar