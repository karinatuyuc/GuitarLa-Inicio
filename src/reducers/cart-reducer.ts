import { db } from "../data/db";
import { CartItem, Guitar } from '../types/index';

export type CartActions =  //Aqui van las acciones que ejecutaremos
    { type: 'add-to-cart', payload: {item : Guitar}} |
    { type: 'remove-from-cart', payload: {id : Guitar['id']}} |
    { type: 'decrease-quantity', payload: {id: Guitar['id']}} |
    { type: 'increase-quantity', payload: {id: Guitar['id']}} |
    { type: 'clear-cart'}

//Creando type para el estado
export type CartState = {
    data: Guitar[],
    cart: CartItem[]
}

export const initialState : CartState = {
    data: db,
    cart: []
}

const MIN_ITEMS = 1
const MAX_ITEMS= 5

export const cartReducer = (
    //Recibe el estado y la accion
      state: CartState = initialState,
      action: CartActions

   ) => {

     if(action.type === "add-to-cart") {

        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id);

        let updatedCart : CartItem[] = [];
        if (itemExists) { 
            updatedCart = state.cart.map(item => {
                if (item.id === action.payload.item.id){
                    if(item.quantity < MAX_ITEMS) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            const newItem: CartItem = {...action.payload.item, quantity: 1}
            updatedCart = [...state.cart, newItem]
        }
        return {
            ...state,
            cart: updatedCart

        }
     }


     if(action.type === "remove-from-cart") {
        const cart = state.cart.filter( item => item.id !== action.payload.id)
        return  {
            ...state,
            cart //Solo podemos usar el nombre si es igual al nombre de la propiedad
        }
     }

     if(action.type === "decrease-quantity") {
        const updatedCart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        return {
            ...state,
            cart: updatedCart
        }
     }

     if(action.type === "increase-quantity") {
        const updatedCart = state.cart.map( item => {
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item


        })

        return {
            ...state,
            cart: updatedCart
        }
     }

     if(action.type === "clear-cart") {
        return {
            ...state,
        }
     }

     return state;

}