import React from 'react';
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled } from '@material-ui/core/styles';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
// components
import { Box, InputAdornment } from '@material-ui/core';
import Page from '../components/Page';
import { BlogPostCard } from '../components/_dashboard/blog';
import { connect } from 'react-redux'
// ------------------------------
import {CreateBlog , GetBlogs} from '../APIcalls/Blog';

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      width: 240,
      '& .MuiAutocomplete-inputRoot': {
        boxShadow: theme.customShadows.z12
      }
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-child)': {
      borderBottom: `solid 1px ${theme.palette.divider}`
    }
  }
}));

function Blog(props) {
  const [openDailog,setOpenDailog] = React.useState(false);
  const handleClose = () => {
    setOpenDailog(false);
  };
  const [serachValue,setSerachValue] = React.useState('')
  const AllBlogs = useSelector((state) => state.blogReducer);

  
  const [filteredBlogs, SetFilteredBlogs] = React.useState(AllBlogs);
  
  const [blogTitle,setBlogTitle] = React.useState('');
  const [blogDescription,setBlogDescription] = React.useState('');
  React.useEffect(() => {
    GetBlogs()
    .then((res => {
      props.dispatch({
        type: "ADD_FETCHED_DATA",
        payload: res.data
      })
    }))
    if (serachValue) {
      const reqData = AllBlogs.map((blog, index) => {
        if( blog.title.toLowerCase().indexOf(serachValue.toLowerCase()) >= 0 ) {
          return blog;
        };
        return null
      });
      SetFilteredBlogs(
        reqData.filter(val => {
          if (val) return true;
          return false;
        })
      );
    } else SetFilteredBlogs(AllBlogs);

  },[serachValue,AllBlogs,filteredBlogs])

  const SaveBlog = (e) => {
    e.preventDefault();
    if(blogTitle){
      CreateBlog(blogTitle,blogDescription)
      .then(() =>{
        GetBlogs()
        .then((res => {
          props.dispatch({
            type: "ADD_FETCHED_DATA",
            payload: res.data
          })
        }))
      })
    }
    setOpenDailog(false);
  }

  const onSort = (e) => {
    e.preventDefault();
    switch(e.target.value) {
      case "Latest" : return props.dispatch({ 
        type : "SORT_BY_LATEST",
        payload: AllBlogs
      })
      case "Popularity" : return props.dispatch({ 
        type : "SORT_BY_POPULARITY",
        payload: AllBlogs
      }) 
      case "Oldest" : return props.dispatch({ 
        type : "SORT_BY_OLDEST",
        payload: AllBlogs
      })
      default : break;
    }
  }
  return (
    <Page title="Dashboard: Blog">
      <Container>
      <Dialog open={openDailog}>
        <DialogTitle>Add Blog</DialogTitle>
        <form onSubmit={(e) => SaveBlog(e)}>
        <DialogContent>
          <DialogContentText>
          Add Blogs where users can spend their free time reading about fresh arrivals, new products, trending sales etc...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            required
            variant="standard"
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          <TextField
            multiline={true}
            rows={10}
            margin="dense"
            required
            id="required"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setBlogDescription(e.target.value)}
            inputProps={{ minLength: 50 }}
          />

        </DialogContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
        </Stack>

        </form>
      
      </Dialog>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            type="button"
            variant="contained"
            onClick={() => {setOpenDailog(true)}}
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button>
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <RootStyle>
                <TextField
                  placeholder="Search Blog..."
                  onChange={(e) => setSerachValue(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <Box
                            component={Icon}
                            icon={searchFill}
                            sx={{
                              ml: 1,
                              width: 20,
                              height: 20,
                              color: 'text.disabled'
                            }}
                          />
                        </InputAdornment>
                      </>
                    )
                  }}
                />
          </RootStyle>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={(e) => onSort(e)}
          autoWidth
          label="Sort"
        >
            <MenuItem key="latest" value="Latest">
                Latest
              </MenuItem>
              <MenuItem key="popularity" value="Popularity">
                Popularity
              </MenuItem>
              <MenuItem key="oldest" value="Oldest">
                Oldest
              </MenuItem>
        </Select>
      </FormControl>

        </Stack>
        <Grid container spacing={3}>
          {
            filteredBlogs.length > 0 ? Object.keys(filteredBlogs).map(function(key, index) {
             return <BlogPostCard id={filteredBlogs[key].id} description={filteredBlogs[key].description} cover={filteredBlogs[key].cover} title={filteredBlogs[key].title} view="" avatarUrl={filteredBlogs[key].avatarUrl} key={filteredBlogs[key].id} index={index} />
            }) : Object.keys(AllBlogs).map(function(key, index) {
              return <BlogPostCard cover={AllBlogs[key].cover} description={AllBlogs[key].description} title={AllBlogs[key].title} view="" avatarUrl={AllBlogs[key].avatarUrl} key={AllBlogs[key].id} index={index} />
            }) 
          }
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