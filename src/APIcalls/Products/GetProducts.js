import axios from 'axios';

export default async function GetProducts(){
    return await axios.get("http://localhost:5000/products");
}