//archivo que actualiza la cantidad de articulos agregados en el carrito (iconos en la barra de menu) - Navigators/Main
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Badge, Text } from 'native-base'

//metodo para conectar el store de redux
import { connect } from 'react-redux'


const CartIcon = (props) => {
    return (
        <>
            {props.cartItems.length
            ? (
                <Badge style={styles.badge}>
                    <Text style={styles.text}>{props.cartItems.length}</Text>
                </Badge>
            ) : null}
        </>
    );
};

//almacena y trae el storage del carrito de compra
const mapStateTopProps = (state) => {
    const { cartItems } = state;
    return{
        cartItems: cartItems,
    }
}

export default connect(mapStateTopProps)(CartIcon)

const styles = StyleSheet.create({
    badge: {
        width: 25,
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        top: -4,
        right: -15,
      },
      text: {
        fontSize: 12,
        width: 100,
        fontWeight: "bold",
      },
})
