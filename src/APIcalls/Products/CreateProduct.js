import axios from 'axios';
import { mockImgProduct } from '../../utils/mockImages';

export default async function CreateBlog(productname,price){
    let today = new Date();
    const product = {
        "cover": mockImgProduct(Math.floor(Math.random() * (24)  + 1)),
        "name": productname,
        "price": price,
        "createdAt" : today,
    }
    if(productname && price) {
        return await axios.post("http://localhost:5000/products",product)
    }
    return null;
}