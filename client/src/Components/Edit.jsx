import React, { useState, useEffect } from "react";
import "./Edit.scss";
import { api } from "../api";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withRouter } from "react-router-dom";

import Header from "./Header";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const categoriesArr = ["Lifestyle","Food","Travel","Movie","Photography","Social Media","Pets","Technology","Fashion","Beauty"];
const options = categoriesArr.map(cat =>(
    <MenuItem value={cat}>{cat}</MenuItem>
));

const Edit = ({match, history}) => {
    const [postTitle, setTitle] = useState();
    const [postContent, setContent] = useState();
    const [category, setCategory] = React.useState('');
    const [image, setImage] = React.useState('');
    const [articleData, setArticleData] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        async function fetchArticle() {
            const article = await api.get("/" + match.params.id);
            setArticleData(article.data.article);
            setTitle(article.data.article.title);
            setContent(article.data.article.content);
            setCategory(article.data.article.category);
            setImage(article.data.article.featuredImage);
        }
        fetchArticle();
    }, []);

    const postForm = async event => {
        event.preventDefault();
        let data = {
            _id: articleData._id,
            title: postTitle,
            content: postContent,
            category: category,
            featuredImage: image,
            userId: articleData.userId
        }
        
        const edit = await api.post("/update", {
            _id: articleData._id,
            title: postTitle,
            content: postContent,
            category: category,
            featuredImage: image,
            userId: articleData.userId
        }).then(function (response) {
                history.push("/article/"+articleData._id);
            })
            .catch(function (error) {
                    console.log(error);            
            });
    };

    const postHeaderStyle = {
        height: '50vh',
        backgroundImage: `url("${articleData.featuredImage}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        verticalAlign: 'top',
        backgroundPosition: 'center center',
        transformOrigin: 'center top',
        transform: 'translateZ(-#{0.5 * 2}px) scale(1 + 0.5 * 2)'
    }

    return (
        <div className="edit_main">
            <div style={postHeaderStyle}>
            </div>
            <div className="edit_section">
                <Header />
                <div className="edit_main_wrapper">

                    <div className="edit_article_wrapper">
                        <Container component="main" maxWidth="lg">
                            <CssBaseline />
                            <div className={classes.paper}>

                                <Typography component="h1" variant="h3">
                                    Edit an Article
                                </Typography>
                                <form className={classes.form} onSubmit={postForm}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="title"
                                                required
                                                fullWidth
                                                id="title"
                                                variant="filled"
                                                value={postTitle}
                                                onChange={e => setTitle(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="category-select-label">Category</InputLabel>
                                                <Select
                                                    labelId="category-label"
                                                    id="category-select"
                                                    selectedValue={category}
                                                    value={category}
                                                    variant="filled"
                                                    onChange={e => setCategory(e.target.value)}
                                                >
                                                    {options}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="featuredImage"
                                                required
                                                fullWidth
                                                id="featuredImage"
                                                variant="filled"
                                                value={image}
                                                onChange={e => setImage(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="body"
                                                name="body"
                                                multiline
                                                rows="4"
                                                variant="filled"
                                                value={postContent}
                                                onChange={e => setContent(e.target.value)}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Post
                                    </Button>

                                </form>
                            </div>
                            <Box mt={5}>
                            </Box>
                        </Container>
                    </div>
                </div>
                <footer>&copy; Copyright 2020. Team C</footer>
            </div>
        </div>
    )
};

export default withRouter(Edit);






