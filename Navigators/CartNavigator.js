//archivo que controla la navegacion en la seccion del carro de compras - Navigators/Main
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Cart from '../Screens/Cart/Cart';
import CheckoutNavigator from './CheckoutNavigator'

const Stack = createStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Checkout"
                component={CheckoutNavigator}
                options={{
                    title:"Verificar"
                }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}