import axios from 'axios';

export default async function AddProductToCart(productId,quantity,userId){
  
    let products = await axios.get("http://localhost:5000/products");
    console.log(products.data)
    const currProduct = products.data.find(product => product.id === productId);
    
    const newProduct = {
        ...currProduct,
        "quantity" : quantity
    }
    let users = await axios.get("http://localhost:5000/users");
    console.log(users.data)
    const currUser = users.data.find(user => user.id === userId);
    console.log(currUser);
    console.log(currUser.CartProducts)
    let isProductAlreadyExists = (currUser.CartProducts.forEach((product) => {
        if(product.id === productId) return true;
    }));
    console.log(isProductAlreadyExists)
    if(isProductAlreadyExists){
        currUser.CartProducts.map(product => {
            if(product.id === productId){
                product.quantity += quantity;
                return ;
            }
        })
    }
    else{
        currUser.CartProducts.push(newProduct);
    }

    return await axios.put(`http://localhost:5000/users/${productId}`,currUser).then(response => console.log(response));
}