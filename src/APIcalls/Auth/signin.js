import axios from 'axios';

async function GetUsers(){
    const users = await axios.get('http://localhost:5000/users')
     .then((result) => {console.log(result.data.data);return result.data})
     .catch((error) => {
         console.log(error);
     })
 
     return users;
 }
 
 const isuserExists = async (email) => {
    const users = await GetUsers();
    console.log("USERS",users);
     console.log("USERS",users);
     let isUser = false;
     for(let i = 0; i < users.length; i++) {
         if(users[i].email === email) {
             isUser = true;
             return isUser;
         }
     }

     return isUser;
 }

export default async function Signin(user){
    if(!user.email){
        return ({status: 401,msg : 'Please Enter all input fields!'});
    }
  
    if(!isuserExists(user.email)){
        return ({status: 401,msg : 'User does not exist.Please Sign Up!'}); 
    }
    const users = await GetUsers();

    console.log("USERS",users);

    for(let i = 0; i < users.length; i++) {
        console.log(users[i].email,users[i].password, "===" , user.email , user.password)
        if(users[i].email === user.email && users[i].password === user.password) {
            console.log("HELLO")
            return ({status: 200,msg : 'User Sucessfully Signed In'});
        }
    }
    return ({status: 401,msg : 'User does not exist.Please Sign Up'}); 
}
