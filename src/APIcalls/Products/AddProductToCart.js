import axios from 'axios';

export default async function AddProductToCart(productId,quantity,userId){
  
    let products = await axios.get("http://localhost:5000/products");
    const currProduct = products.data.find(product => product.id === productId);
    
    const newProduct = {
        ...currProduct,
        "quantity" : (quantity)
    }
    let currUser = await axios.get(`http://localhost:5000/users/${userId}`);
    console.log(currUser)
    let isProductAlreadyExists = false;
    
    for(let i = 0; i < currUser.data.CartProducts.length; i++){
        if(currUser.data.CartProducts[i].id === productId){
            isProductAlreadyExists = true;
            break ;
        }
    }
    if(isProductAlreadyExists){
        for(let i = 0; i < currUser.data.CartProducts.length; i++){
            if(currUser.data.CartProducts[i].id === productId){
                currUser.data.CartProducts[i].quantity = parseInt( parseInt(currUser.data.CartProducts[i].quantity) + parseInt(quantity) );
                console.log("Product already exists.Increasing Quantity")
                break ;
            }
        }
    }
    else{
        currUser.data.CartProducts.push(newProduct);
        console.log("Product not exists in cart. Adding Product to Cart");
        console.log( currUser.data.CartProducts);
    }
        
    return await axios.put(`http://localhost:5000/users/${userId}`,currUser.data).then(response => {return response});
 

}