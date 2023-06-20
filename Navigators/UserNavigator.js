//archivo que contiene la navegacion principal de User (usuario) - Navigators/Main
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'

import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'

const Stack = createStackNavigator();

function MyStack()  {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="UserProfile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack/>
}

const styles = StyleSheet.create({})
