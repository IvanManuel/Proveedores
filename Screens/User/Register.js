//archivo que muestra la seccion de registro  - Navigator/UserNavigatior
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'

import axios from 'axios'
import baseURL from '../../assets/common/baseURL'
//archivo que contiene estilos para los botones
import EasyButton from '../../Shared/StyledComponents/EasyButton'

import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'


const Register = (props) => {

    //estado que almacena el email que ingrese en el formulario
    const [email, setEmail] = useState('')
    //estado que almacena el nombre ingresado en el formulario
    const [name, setName] = useState('')
    //estado que almacena el telefono
    const [phone, setPhone] = useState('')
    //estado que almacena la contraseña que ingrese en el formulario
    const [password, setPassword] = useState('')
    //estado que almacena si ocurre algun error en el formulario
    const [error, setError] = useState("")

    //funcion qal presionar registrarse en el formulario
    const register = () => {
        
        //validmos que todos los campos esten llenos
        if (email === "" || name === "" || phone === "" || password === "") {
            setError("Debe llenar todos los datos del formulario")
        }

        //almacenamos todos los datos del formulario
        let user = {
            name,
            email,
            password,
            phone,
            isAdmin: false,
        }

        //hacemos una peticion a la pase de datos pasandole los datos del formulario
        axios.post(`${baseURL}users/register`, user)
            .then((res) => {
                if(res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registro Satisfactorio",
                        text2: "Ahora puede iniciar sesion con su cuenta"
                    })

                    setTimeout(() => {
                        props.navigation.navigate("Login")
                    }, 700)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Algo salió mal",
                    text2: "Por favor intente de nuevo"
                })
            })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            {/*formulario de login */}
            <FormContainer title={"Registrarse"}>
                {/*Email */}
                <Input
                    placeholder={"Ingresa tu email"}
                    name={"email"}
                    id={"email"}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                {/*nombre */}
                <Input
                    placeholder={"Ingresa tu nombre"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text) => setName(text)}
                />
                {/*teelfono */}
                <Input
                    placeholder={"Ingresa tu telefono"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                {/*Contraseña */}
                <Input
                    placeholder={"Ingresa tu contraseña"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />


                <View style={styles.buttonGroup}> 
                    {/*si el estado error tiene algo le pasamos la propiedad del error al componente Error */}
                    {error ? <Error message={error}/> : null} 
                </View>
                <View style={styles.buttonGroup}>
                    <EasyButton 
                        primary
                        large
                        onPress={() => register()}
                    >
                        <Text style={{ color: "white"}}>Registrase</Text>
                    </EasyButton>
                </View>
                <View style={styles.buttonGroup}>
                    <Text style={{ marginBottom: 10}}>Ya tienes una cuenta</Text>
                    <EasyButton  
                        secondary
                        large 
                        onPress={() => props.navigation.navigate("Login")}
                    >   
                        <Text style={{ color: "white"}}>Ir a Acceder</Text>
                    </EasyButton>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
      },
})
