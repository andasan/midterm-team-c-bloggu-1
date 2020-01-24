import React, { useState } from "react";
import "./Post.scss";
import { api } from "../api";
<<<<<<< HEAD
import { Redirect } from "react-router-dom";
=======

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

>>>>>>> master
import Header from "./Header";

const postHeaderStyle = {
  height: "50vh",
  background: `url("https://images.unsplash.com/photo-1573718893672-86144926f4fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3900&q=80")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
  verticalAlign: "top",
  backgroundPosition: "center center",
  transformOrigin: "center top",
  transform: "translateZ(-#{0.5 * 2}px) scale(1 + 0.5 * 2)"
};

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

const Post = () => {
  const [postTitle, setTitle] = useState();
  const [postContent, setContent] = useState();

  const postForm = async event => {
    console.log("inside signForm");
    event.preventDefault();
    if (postTitle !== undefined && postTitle !== "") {
      //handleSubmit(userEmail,userPass);
      try {
        const post = await api.post("/post", {
          title: postTitle,
          content: postContent,
          userId: localStorage.getItem("user")
        });
        return <Redirect to={"/"} />;
      } catch (err) {
        console.log(err);
      }

      setTitle("");
      setContent("");
    }
  };

  const handleTitleChange = value => {
    setTitle(value);
  };

  const handleContentChange = value => {
    setContent(value);
  };

     return (
        <div className="post_main">
            <div style={postHeaderStyle}>
            </div>
            <div className="post_section">
                <Header />
                <div className="post_main_wrapper">

                    <div className="post_article_wrapper">
                        <Container component="main" maxWidth="lg">
                            <CssBaseline />
                            <div className={classes.paper}>

                                <Typography component="h1" variant="h3">
                                    Write an Article
                                </Typography>
                                <form className={classes.form} onSubmit={postForm}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoComplete="title"
                                                name="title"
                                                required
                                                fullWidth
                                                id="title"
                                                label="Title"
                                                autoFocus
                                                onChange={e => handleTitleChange(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="category-select-label">Category</InputLabel>
                                                <Select
                                                    labelId="category-label"
                                                    id="category-select"
                                                    value={category}
                                                    onChange={handleCategoryChange}
                                                >
                                                    {options}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="body"
                                                label="Body"
                                                name="body"
                                                multiline
                                                rows="4"
                                                autoComplete="body"
                                                onChange={e => handleContentChange(e.target.value)}
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
            </div>
        </div>
    )          
};

export default Post;






