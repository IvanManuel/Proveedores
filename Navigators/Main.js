//archivo que contiene la navegacion principal, las rutas a las otras pantalla - App 
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
//crear la barra de menu abajo
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

//stack paginas del menu
import HomeNavigator from './HomeNavigator';
import BusinessNavigator from './BusinessNavigator';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator'
import AdminNavigator from './AdminNavigator'

import CartIcon from '../Shared/CartIcon';
import AuthGlobal from '../Context/store/AuthGlobal';

const Tab = createBottomTabNavigator();

const Main = () => {

    //constante que almacena la autenticaciaon del usuario
    const context = useContext(AuthGlobal)

    return (
        //creamos la barra de navegacion
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: "#e91e63",
            }}
        >
            {/*Menu de inico */}
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="home"
                            color={color}
                            size={30}
                        />
                    ),
                }}
            />

            {/*Menu de Proveedores */}
            <Tab.Screen
                name="Business"
                component={BusinessNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="clipboard"
                            color={color}
                            size={30}
                        />
                    ),
                }}
            />

            
            {/*Menu de carrito de compras */}
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon
                                name="shopping-cart"
                                color={color}
                                size={30}
                            />
                            <CartIcon/>
                        </View>
                    )
                }}
            />
    
            {context.stateUser.user.isAdmin == true 
            ? (
                /*Menu del administrador */
                <Tab.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="cog"
                            color={color}
                            size={30}
                        />
                    )
                }}
                />
            ) : null }

            {/*Menu de usuario */}
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="user"
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
                  </Tab.Navigator>
    )
}
 
export default Main

const styles = StyleSheet.create({})
