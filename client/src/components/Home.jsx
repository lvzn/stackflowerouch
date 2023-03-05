import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { Stack } from '@mui/system'
import { Button, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Alert } from '@mui/material'
import { Card } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'


function Home() {
    const [text, setText] = useState(""); //text state for posting content
    const [alert, setAlert] = useState(false); //alert state for the application to know when to show alerts
    const [alertContent, setAlertContent] = useState(""); //state for application to set alert content from e.g. api response
    const [items, setItems] = useState([]); // state for application to fetch the posts from api to
    const [updateStates, setUpdateStates] = useState({ updateStates: [] }); //state for app to fetch vote data from api to
    const [update, setUpdate] = useState(false); //state for application to update post data when user creates a new post
    const authToken = localStorage.getItem("authToken") //retrieve auth token from localstorage

    //load posts and vote data from database through api
    useEffect(() => {
        let ignore = false
        if (ignore) return;
        fetch('/api/post')
            .then(res => res.json())
            .then(data => setItems(data))
        if (authToken) {
            fetch('/api/vote', {
                headers: {
                    "authorization": "Bearer " + authToken
                }
            })
                .then(res => res.json())
                .then(data => setUpdateStates(data))
        }
        return () => {
            ignore = true
        };
    }, [update, authToken]); //when a change is made to update state, run this again

    //function for sending post content to database
    function submitPost(e) {

        e.preventDefault()
        //show alert if user has no auth token
        if (!authToken) {
            setAlertContent("Please log in first")
            setAlert(true)
            return
        }

        fetch("/api/post", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + authToken
            },
            body: JSON.stringify({ text: text })
        })
            .then(res => res.json())
            .then(data => {
                setAlertContent(data)
                setAlert(true)
            })
        setUpdate(!update)

    }

    //function that lets user type tab characters into the post field
    function handleTab(e) {
        const { value } = e.target
        if (e.key === 'Tab') {
            e.preventDefault()
            const cursorPosition = e.target.selectionStart
            const cursorEndPosition = e.target.selectionEnd
            const tab = '\t'
            e.target.value =
                value.substring(0, cursorPosition) +
                tab +
                value.substring(cursorEndPosition);
        }
    }



    return (
        <Container maxWidth="xl" sx={{ alignContent: "left" }} >

            <Stack spacing={2} sx={{ m: "2rem" }}>
                {/* map items that were set in useEffect to show on the page */}
                {items.map(item => {
                    return (<ListItem key={item._id} item={item} updateStates={updateStates} />)
                })}
                {/* show alert when alert state is set to true */}
                {alert ? <Alert severity='error'>{alertContent}</Alert> : <></>}
                <Stack direction={'column'} sx={{ s: 1 }} spacing={2}>
                    <TextField
                        onKeyDown={e => handleTab(e)}
                        id="post"
                        label="Create a new post"
                        variant="outlined"
                        color="primary"
                        margin="none"
                        fullWidth
                        sizes="large"
                        multiline
                        onChange={(e) => setText(e.target.value)}
                    />


                    <Button variant="contained" color="primary" onClick={submitPost}>
                        Post
                    </Button>
                </Stack>
            </Stack>

        </Container>
    )
}

// another component for the posts
function ListItem(props) {
    const authToken = localStorage.getItem('authToken')

    //states for handling the number and status of votes
    const [voted, setVoted] = useState(false);
    const [votes, setVotes] = useState(props.item.votes);


    //useEffect for updating the values of votes based on data fetched in the main component
    useEffect(() => {
        let ignore = false
        if (ignore) return
        if (props.updateStates !== null && props.updateStates.posts !== undefined) {
            if (props.updateStates.posts.includes(props.item._id)) {
                setVoted(true)
            }
        }
        return () => {
            ignore = true
        };
    }, [props]);

    //function for sending user votes to the database through api
    //api has separate routes for adding a vote and removing one, so two different cases are needed
    //with better backend code this couldve been avoided but it is what it is now
    function sendVote() {
        voted ?
            fetch(`/api/unvote`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + authToken
                },
                body: JSON.stringify({ post: props.item._id })
            })
                .then(res => res.json()).then(msg => console.log(msg))
            :
            fetch(`/api/vote`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + authToken
                },
                body: JSON.stringify({ post: props.item._id })
            })
                .then(res => res.json()).then(msg => console.log(msg))
    }

    const initialVotes = votes

    return (
        <>
            <Card variant='outlined'>
                <CardContent>{props.item.username} posts:</CardContent>
                <div style={{ justifyContent: "flex-end" }}>
                    <Typography style={{ wordWrap: "break-word" }} align={"left"} variant="body1" sx={{ whiteSpace: "pre-wrap" }} noWrap={false} color="initial"><CardContent>{props.item.text}</CardContent></Typography>
                </div>
                <CardActions >
                    <Button component={Link} to={'/post/' + props.item._id} size='small'>comments</Button>
                    <IconButton color='inherit' onClick={() => {
                        // send votes to api and change vote button style
                        setVoted(!voted)
                        sendVote()
                        voted ? setVotes(initialVotes - 1) : setVotes(initialVotes + 1)
                        return
                    }} >
                        {voted ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                    <Typography variant="body2" color="initial">{votes}</Typography>
                </CardActions>
            </Card>
        </>
    )
}

export default Home