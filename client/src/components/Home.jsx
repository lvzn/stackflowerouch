import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { Stack } from '@mui/system'
import { Button, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Grid } from '@mui/material'
import { Alert } from '@mui/material'
import { Card } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'


function Home() {
    const [text, setText] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [items, setItems] = useState([]);
    const [updateStates, setUpdateStates] = useState({ updateStates: [] });
    const [update, setUpdate] = useState(false);
    const authToken = localStorage.getItem("authToken")

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
    }, [update, authToken]);


    function submitPost(e) {

        e.preventDefault()

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
                {items.map(item => {
                    return (<ListItem key={item._id} item={item} updateStates={updateStates} />)
                })}

                {alert ? <Alert severity='error'>{alertContent}</Alert> : <></>}
                <Stack direction={'row'} sx={{ s: 1 }} spacing={2}>
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

function ListItem(props) {
    const authToken = localStorage.getItem('authToken')
    const [voted, setVoted] = useState(false);
    const [votes, setVotes] = useState(props.item.votes);



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
                <Typography align={"left"} variant="body1" color="initial"><CardContent><pre>{props.item.text}</pre></CardContent></Typography>

                <CardActions >
                    <Button component={Link} to={'/post/' + props.item._id} size='small'>comments</Button>
                    <IconButton color='inherit' onClick={() => {
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