//archivo que recidecciona a la pantalla principal de la aplicacion - Main
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//contenedor principal de la empresa
import BusinessContainer from '../Screens/Business/BusinessContainer';
//contenedor de una sola empresa
import SingleBusiness from '../Screens/Business/SingleBusiness';

const Stack = createStackNavigator()

function MyStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Business'
                component={BusinessContainer}
                options={{
                    headerShown: false,
                }}
            /> 
            <Stack.Screen
                name='Business Detail'
                component={SingleBusiness}
                options={{
                    headerShown: false,
                }}
            /> 
        </Stack.Navigator>
    )
}

export default function BusinessNavigator() {
    return <MyStack/>
}