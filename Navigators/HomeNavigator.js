//archivo que recidecciona a la pantalla principal de la aplicacion - Main
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//contenedor principal de productos
import ProductContainer from '../Screens/Products/ProductContainer'
//contenedor de un solo producto
import SingleProduct from '../Screens/Products/SingleProduct'

const Stack = createStackNavigator()

function MyStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Products'
                component={ProductContainer}
                options={{
                    headerShown: false,
                }}
            /> 
            <Stack.Screen
                name='Product Detail'
                component={SingleProduct}
                options={{
                    headerShown: false,
                }}
            /> 
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack/>
}