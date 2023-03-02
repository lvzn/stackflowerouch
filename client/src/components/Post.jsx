import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import { Card, CardContent, CardActions, IconButton, Typography, TextField, Button, Stack } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material'

function Post(props) {
    const authToken = localStorage.getItem('authToken')

    const params = useParams() //get url parameters from react router to get post id 
    const postId = params.id
    const [voted, setVoted] = useState(false); //votestate, similar to one in home component
    const [text, setText] = useState(""); //text state, similar to one in home component
    const [votes, setVotes] = useState(props.votes); //votes state, similar to one in home component
    const [post, setPost] = useState([]); //post state for loading the post from api to
    const [comments, setComments] = useState([]); //comments state for loading the comments from api to
    const [alert, setAlert] = useState(false); //similar to one in home component, this component doesn't implement the use of alerts yet though
    const [update, setUpdate] = useState(false); //update state similar to one in home component
    const [updateStates, setUpdateStates] = useState({ posts: [] }); //similar to state with same name in home component
    const [alertContent, setAlertContent] = useState("");
    let initialVotes = votes

    //useEffect for loading post, comments and votes of user
    useEffect(() => {
        let ignore = false
        if (ignore) return;
        fetch(`/api/post/${postId}`)
            .then(res => res.json())
            .then(data => {
                setPost(data)
                setVotes(data.votes)
            })

        fetch(`/api/comments/${postId}`)
            .then(res => res.json())
            .then(data => setComments(data))

        if (authToken) {
            fetch('/api/vote', {
                headers: {
                    "authorization": "Bearer " + authToken
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUpdateStates(data)

                })
        }

        return () => {
            ignore = true
        };

    }, [update, authToken]);

    //useEffect for updating votes on screen based on api data
    useEffect(() => {
        if (updateStates.posts !== undefined) {

            if (updateStates.posts.includes(post._id)) {
                setVoted(true)
            }
        }
        return () => {

        };
    }, [updateStates]);

    //similar to one in home component
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

    //similar to one in home component, but posts to different route in api
    function postComment(e) {
        e.preventDefault()
        const authToken = localStorage.getItem("authToken")
        if (!authToken) {
            setAlertContent("Please log in first")
            setAlert(true)
            return
        }

        fetch("/api/comment", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": "Bearer " + authToken
            },
            body: JSON.stringify({ post: params.id, text: text })
        })
            .then(res => res.json())
            .then(data => {
                setAlertContent(data)
                setAlert(true)
            })
        setUpdate(!update)
    }

    //similar to one in home component
    function sendVote() {
        voted ?
            fetch(`/api/unvote`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + authToken
                },
                body: JSON.stringify({ post: post._id })
            })
                .then(res => res.json()).then(msg => console.log(msg))
            :
            fetch(`/api/vote`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + authToken
                },
                body: JSON.stringify({ post: post._id })
            })
                .then(res => res.json()).then(msg => console.log(msg))
    }

    //post layout containing single post and mapping the comments for it
    return (
        <>
            <Container maxWidth="xl">
                < Container maxWidth="lg" sx={{ marginTop: 2 }}  >

                    <Card variant='outlined'>
                        <CardContent>{post.username} posts:</CardContent>
                        <Typography align={"left"} variant="body1" color="initial"><CardContent>
                            <pre>{post.text}</pre></CardContent>
                        </Typography>
                        <CardActions >
                            <IconButton color='inherit' onClick={() => {
                                sendVote()
                                setVoted(!voted)
                                voted ? setVotes(initialVotes - 1) : setVotes(initialVotes + 1)
                                return
                            }} >
                                {voted ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                            <Typography variant="body2" color="initial">{votes}</Typography>
                        </CardActions>
                    </Card>
                </ Container>
                <Container maxWidth="md" sx={{ marginTop: 2, marginBottom: 2 }}>
                    <Stack spacing={2}>
                        {
                            comments.map(comment =>
                                (<Comment key={comment._id} comment={comment} updateStates={updateStates} />))
                        }
                        <Stack direction={"row"} spacing={2}>
                            <TextField
                                onKeyDown={e => handleTab(e)}
                                id="post"
                                label="Comment on this post"
                                variant="outlined"
                                color="primary"
                                margin="none"
                                fullWidth
                                sizes="large"
                                multiline
                                onChange={(e) => setText(e.target.value)}
                            />
                            <Button variant="contained" color="primary" onClick={(e) => {
                                postComment(e)
                            }}>
                                comment
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Container>
        </>
    )
}

//subcomponent rendering each comment to the app
function Comment({ comment, updateStates }) {
    const authToken = localStorage.getItem('authToken')
    const [voted, setVoted] = useState(false);
    const [votes, setVotes] = useState(comment.votes);
    let initialVotes = votes

    //similar to one in home component, but sends comment votes instead
    function sendVote() {
        voted ?
            fetch(`/api/unvote`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + authToken
                },
                body: JSON.stringify({ comment: comment._id })
            })
                .then(res => res.json()).then(msg => console.log(msg))
            :
            fetch(`/api/vote`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": "Bearer " + authToken
                },
                body: JSON.stringify({ comment: comment._id })
            })
                .then(res => res.json()).then(msg => console.log(msg))
    }

    //update votes of comments based on api data
    useEffect(() => {
        if (updateStates.comments !== undefined) {
            if (updateStates.comments.includes(comment._id)) {
                setVoted(true)
            }
        }
        return () => {

        };
    }, [updateStates]);

    return (
        <Card variant='outlined'>
            <CardContent>{comment.username} comments:</CardContent>
            <Typography align={"left"} variant="body1" color="initial"><CardContent>
                <pre>{comment.text}</pre>
            </CardContent></Typography>
            <CardActions>
                <IconButton color='inherit' onClick={() => {
                    sendVote()
                    setVoted(!voted)
                    voted ? setVotes(initialVotes - 1) : setVotes(initialVotes + 1)
                    return
                }} >
                    {voted ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <Typography variant="body2" color="initial">{votes}</Typography>
            </CardActions>
        </Card>)
}

export default Post