import axios from 'axios';
import { mockImgCover } from '../../utils/mockImages';

export default async function CreateBlog(blogtitle){
    const blog = {
        "title" : blogtitle,
        "author": {
            "avatarUrl": `/static/mock-images/avatars/avatar_${Math.floor(Math.random() * (24) + 1)}.jpg`
        }
    }
    return await axios.post("http://localhost:5000/blogs",blog)
}