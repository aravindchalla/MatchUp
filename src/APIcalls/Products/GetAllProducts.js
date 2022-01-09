import axios from 'axios';

export default async function GetAllProducts(){
    return await axios.get("http://localhost:5000/products");
}