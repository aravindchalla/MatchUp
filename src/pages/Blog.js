import React from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// components
import Page from '../components/Page';
import { BlogPostCard , BlogDailog} from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';
import { connect } from 'react-redux'
// ------------------------------
import {CreateBlog} from '../APIcalls/Blog';


function Blog({blogs}) {
  const [openDailog,setOpenDailog] = React.useState(false);
  const handleClose = () => {
    setOpenDailog(false);
  };
  const [blogTitle,setBlogTitle] = React.useState('');
  React.useEffect(() => {
    console.log(openDailog)
  })

  const SaveBlog = (e) => {
    e.preventDefault();
    if(blogTitle){
      CreateBlog(blogTitle)
    }
    setOpenDailog(false);
  }
  return (
    <Page title="Dashboard: Blog">
      <Container>
      <Dialog open={openDailog}>
        <DialogTitle>Add Blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setBlogTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => SaveBlog(e)}>Save</Button>
        </DialogActions>
      </Dialog>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            type="button"
            variant="contained"
            onClick={() => {console.log("Clicked on");setOpenDailog(true)}}
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button>
        </Stack>
        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

const mapStateToProps=(state)=>{
  return{
    blogs : state.blogReducer.blogs
  }
}

export default connect(mapStateToProps)(Blog)