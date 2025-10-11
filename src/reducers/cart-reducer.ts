import { db } from "../data/db";
import { CartItem, Guitar } from '../types/index';

export type CartActions = 
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

//creando el estado inicial
export const initialState : CartState = {
    data: db,
    cart: []
};

//creando el reducer
export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {
    //Aqui va las funciones que actticvaran las acciones
    // que definismos en el type CartActions

}