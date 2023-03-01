import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import { Card, CardContent, CardActions, IconButton, Typography, TextField, Alert, Button } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material'

function Post(props) {
    const params = useParams()
    const postId = params.id
    const [voted, setVoted] = useState(false);
    const [text, setText] = useState("");
    const [votes, setVotes] = useState(props.votes);
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    let initialVotes = votes


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
        return () => {
            ignore = true
        };
    }, [postId]);

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

    }

    return (
        <>
            < Container maxWidth="lg" >
                <Card variant='outlined'>
                    <CardContent>{post.username} posts:</CardContent>
                    <Typography align={"left"} variant="body1" color="initial"><CardContent>
                        <pre>{post.text}</pre></CardContent>
                    </Typography>
                    <CardActions >
                        <IconButton color='inherit' onClick={() => {
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
            <Container maxWidth="md">
                {
                    comments.map(comment =>
                        (<Comment key={comment._id} comment={comment} />))
                }
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
                <Button variant="contained" color="primary" onClick={postComment}>
                    Post comment
                </Button>
            </Container>

        </>
    )
}

function Comment({ comment }) {
    const [voted, setVoted] = useState(false);
    const [votes, setVotes] = useState(comment.votes);
    let initialVotes = votes
    return (
        <Card variant='outlined'>
            <CardContent>{comment.username} comments:</CardContent>
            <Typography align={"left"} variant="body1" color="initial"><CardContent>
                <pre>{comment.text}</pre>
            </CardContent></Typography>
            <CardActions>
                <IconButton color='inherit' onClick={() => {
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