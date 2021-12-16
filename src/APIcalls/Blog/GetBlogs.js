import axios from 'axios';

export default async function GetBlogs(){
    return await axios.get("http://localhost:5000/blogs");
}