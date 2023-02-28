import product from '@/sanity_ecommerce/schemas/product'
import React, {createContext, useContext, useState, useEffect} from 'react'
import {toast} from 'react-hot-toast'


const Context = createContext()

export const StateContext = ({children}) =>{

    const [showCart,setShowCart] = useState(false)

    //Tracking items in the cart
    const [cartItems, setCartItems] = useState([])

    //Tracking the total price
    const [totalPrice, setTotalPrice] = useState(0)

    //Tracking the total quantities
    const [totalQuantities, setTotalQuantities] = useState(0)

    const [qty, setQty] = useState(1)


    let foundProduct
    let index

    //Add to cart funciton
    const onAdd = (product,quantity) => {

        //Check if the item is already in the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        //In the case that the added item is already in the cart
        if(checkProductInCart){



            const updatedCartItems = cartItems.map((cartProduct) =>{

                
                if(product._id === cartProduct._id) return{
                    ...cartProduct, //Copy the "item/product"
                    quantity: cartProduct.quantity + quantity
                }


            } )

            setCartItems(updatedCartItems)
            
        } else{

            product.quantity = quantity
            setCartItems([...cartItems, {...product}])

        }

        toast.success(`${qty} ${product.name} added to the cart.`);
   
    }

    const onRemove = (product) =>{

        // foundProduct = cartItems.find((item)=> item._id === product._id)

        // const newCartItems = cartItems.filter((item) => item._id !== product.id)

        // setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price * foundProduct.quantity)
        // settotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
        // setCartItems(newCartItems)

        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
    
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);


    }








    const toggleCartItemQuantity = (id, value) =>{
        foundProduct = cartItems.find((item)=> item._id === id)
        index = cartItems.findIndex((product) => product._id === id)


        //If the itemId != given id (operation in the cart), item would be filtered into newCartItems
        const newCartItems = cartItems.filter((item) => item._id !== id)

        //console.log(newCartItems)

        if(value === 'inc'){

           
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + 1)

            //Code below is discarded because the state in react has different way to be updated
            // foundProduct.quantity += 1
            // cartItems[index] = foundProduct

        }else if(value === 'dec'){

            if(foundProduct.quantity > 1){

                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)

            }


        }


    }


    const incQty = () => {
        setQty((prevQty) => prevQty+1)
    }

    const decQty = () =>{
        setQty((prevQty) => {

            if(prevQty - 1 < 1) return 1

            return prevQty-1
        })
    }

    return (

        //Passing the state "global" value 

        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            onRemove,
            toggleCartItemQuantity


        }}>

         {children}
        </Context.Provider>
    )


}

export const useStateContext = () => useContext(Context)