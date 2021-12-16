import {ADD_FETCHED_DATA , GET_STATE ,SORT_BY_LATEST,SORT_BY_POPULARITY,SORT_BY_OLDEST,SEARCH_BY_TITLE} from '../constants/blogConstants'

const initialState = {
    blogs:[]
}
  
function blogReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FETCHED_DATA:
            return [ ...action.payload];
        case GET_STATE:
            return state;
        case SORT_BY_LATEST :
            action.payload.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            return [ ...action.payload]
        case SORT_BY_OLDEST :
            action.payload.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            console.log(action.payload)
            action.payload.reverse();
            return [ ...action.payload]
        case SORT_BY_POPULARITY :
            action.payload.sort(function(a,b){
                return b.popularity - a.popularity;
            });
            return [ ...action.payload]
        case SEARCH_BY_TITLE :
            const value = action.payload;
            const filterdBlogs = action.state
            console.log(filterdBlogs.length)
/*             let data = action.state.map((blog,index) => {
                if(blog.title.toLowerCase().indexOf(value.toLowerCase()) >= 0){
                    return blog[index];
                }
            })

            let filterdBlogs = data.filter((val) => {
                if(val) return true;
                return false;
            }) */
            return [ ...action.state , filterdBlogs]; 
        default:
            return state;
    }
}
  
  export default blogReducer