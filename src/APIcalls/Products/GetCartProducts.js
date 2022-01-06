import axios from 'axios';

export default async function GetCartProducts(userId){
    return await axios.get(`http://localhost:5000/users/${userId}`).then((response) => {return response.data})
}