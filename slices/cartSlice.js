import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        deleteFromCart: (state, action) => {
            let newCart = [...state.items];
            let indexItem = state.items.findIndex(i=>i.id === action.payload.id);
            if(indexItem>=0){
                newCart.splice(indexItem, 1)
            }
            else {
                console.log("can't remove item in cart")
            }
            state.items = newCart;
        },
       emptyCart: (state, action) => {
            state.items = []
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteFromCart, emptyCart} = cartSlice.actions
export  const selectCartItems = state => state.cart.items;

export const selectCartItemById = (state, id) => state.cart.items.filter(i=>i.id === id);
export const selectCartTotal = state => state.cart.items.reduce((total, item)=> total= total+item.price, 0)

export default cartSlice.reducer