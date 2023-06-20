//archivo que encierra y da estilos al formulario que contienen los input - Cart/Checkout/Checkout - 
import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'

//obtenemos las dimensiones de la pantalla del celular
var { width } = Dimensions.get("window");

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    )
}

export default FormContainer

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 400,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
    }
})
