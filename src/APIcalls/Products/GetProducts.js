import axios from 'axios';

export default async function GetProducts(pageId){
    if(pageId === undefined){
    return await axios.get("http://localhost:5000/products?_page=1&_limit=12");
    }
    if(pageId !== undefined){
        return await axios.get(`http://localhost:5000/products?_page=${parseInt(pageId)}&_limit=12`);
    }
}