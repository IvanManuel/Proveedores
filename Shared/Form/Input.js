//archivo que negera un input con las propiedades que se pasan por props - Cart/Checkout/Checkout - 
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const Input = (props) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
            value={props.value}
            autoCorrect={props.autoCorrect}
            onChangeText={props.onChangeText}
            onFocus={props.onFocus}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
        >
        </TextInput>
    )
}

export default Input

const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: 'black'
    },
})
