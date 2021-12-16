import axios from 'axios';
import { mockImgCover } from '../../utils/mockImages';

export default async function CreateBlog(blogtitle){
    let today = new Date();
    const blog = {
        "title" : blogtitle,
        "cover": mockImgCover(Math.floor(Math.random() * (24)  + 1)),
        "avatarUrl": `/static/mock-images/avatars/avatar_${Math.floor(Math.random() * (24) + 1)}.jpg`,
        "popularity" : Math.floor(Math.random() * (11)),
        "createdAt" : today,
    }
    if(blogtitle) {
        return await axios.post("http://localhost:5000/blogs",blog)
    }
    return null;
}