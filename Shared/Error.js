//archivo que maneja la muestra de errores al usuario - Login
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Error = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.message}</Text>
        </View>
    )
}

export default Error

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        margin: 10
    },
    text: {
        color: 'red'
    }
})
