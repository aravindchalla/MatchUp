import axios from 'axios';

import {API_URL} from '../Backend_URL';

async function GetUsers(){
   const users = await axios.get(`${API_URL}/users`)
    .then((result) => {return result.data})
    .catch((error) => {
        console.log(error);
    })

    return users;
}

const isuserExists = async (email) => {
    const users = await GetUsers();
    console.log(users);
    let isUser = false;
    for(let i = 0; i < users.length; i++) {
        if(users[i].email === email) {
            console.log(users[i])
            isUser = true;
            return isUser;
        }
    }
    return false;
}

export default async function SignUp(user) {
    if(!user.email){
        return ({status: 401,msg : 'Please Enter all input fields!'});
    }
    if(isuserExists(user.email) === true){
        console.log("HI")
        return ({status: 401,msg : 'User already exists'});
    } 
    else{
       return await axios.post(`${API_URL}/users`,user)
        .then((response) => { 
            if(response.status === 200 || response.status ===201){
                return ({status: 200,msg : 'User Sucessfully Signed Up',user: user});
            }
            return ({status: 500,msg : 'Internal Server Error'});
        })
        .catch((error) => {
            console.log(error);
            return ({status: 500,msg : 'Internal Server Error'});
        })
    }
}