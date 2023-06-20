//archivo que controla la navegacion en la verificacion del carrito de compras - Navigator/CartNavigator
import React from 'react'
//nos permite tener varias pantallas en una (submenus)
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// Sub pantallas
import Checkout from '../Screens/Cart/Checkout/Checkout';
import Payment from '../Screens/Cart/Checkout/Payment';
import Confirm from '../Screens/Cart/Checkout/Confirm';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return(
        //las 3 subpantallas en una sola
        <Tab.Navigator>
            {/*Redirige al chequeo del carrito */}
            <Tab.Screen name="Transporte" component={Checkout} />
            {/*Redirige al metodo de pago del carrito */}
            <Tab.Screen name="Pago" component={Payment} />
            {/*Redirige a la confirmacion del proceso de pago del carrito */}
            <Tab.Screen name="Confirmar" component={Confirm} />
        </Tab.Navigator>
    );
}

export default function CheckoutNavigator() {
    return <MyTabs />
}