//archivo del chequeo o transporte del carrito de compras - Navigator/CheckoutNavigator
import React, {useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { Item, Picker, Toast } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//archvo que contiene el formulario para la verificacion de la compra
import FormContainer from '../../../Shared/Form/FormContainer'
//archivo que contiene el modelo del input
import Input from '../../../Shared/Form/Input'
import AuthGlobal from '../../../Context/store/AuthGlobal'

//para realizar la conexion con el storage de redux 
import { connect } from 'react-redux'

//json de las regiones, ciudades
const countries = require("../../../assets/data/countries.json")

const Checkout = (props) => {

    const context = useContext(AuthGlobal)

    //datos del formulario (los mismo que estan en la base de datos)
    const [orderItems, setOrderItems] = useState()
    const [address, setAddress] = useState()
    const [address2, setAddress2] = useState()
    const [city, setCity] = useState()
    const [zip, setZip] = useState()
    const [country, setCountry] = useState()
    const [phone, setPhone] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        setOrderItems(props.cartItems)
        
        if(context.stateUser.isAuthenticated) {
            setUser(context.stateUser.user.userId)
        }else {
            props.navigation.navigate("Cart")
            Toast.show({
                topOffset: 60,
                type: "error",
                text1:"Por favor inicie sesion para comprar",
                text2: ""
            })
        }

        return() => {
            setOrderItems();
        }
    }, [])

    //funcion que almacena todos los datos del formulario
    const checkOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            user,
            zip,
            status: "3",
        }
        //redirige a la seccion de pago y le pasamos el objeto que contiene los datos del formulario
        props.navigation.navigate("Pago", {order: order })
        //console.log("ORDEN", order);
       
    }

    return (
        <View>
            <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true}
            >
                {/*Formulario */}
                <FormContainer title={"Dirección de Envío"}>
                    {/*input de telegono */}
                    <Input
                        placeholder={"Telefono"}
                        name={"phone"}
                        value={phone}
                        keyboardType={"numeric"}
                        onChangeText={(text) => setPhone(text)}
                    />

                    {/*input de direccion de envio */}
                    <Input
                        placeholder={"Direccion de Envio 1"}
                        name={"ShippingAddress1"}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />

                    {/*input de direccion de envio 2*/}
                    <Input
                        placeholder={"Direccion de Envio 2"}
                        name={"ShippingAddress2"}
                        value={address2}
                        onChangeText={(text) => setAddress2(text)}
                    />

                    {/*input de ciudad */}
                    <Input
                        placeholder={"Ciudad"}
                        name={"city"}
                        value={city}
                        onChangeText={(text) => setCity(text)}
                    /> 

                    {/*input de código postal */}
                    <Input
                        placeholder={"código postal"}
                        name={"zip"}
                        value={zip}
                        onChangeText={(text) => setZip(text)}
                    />

                    {/*lista desplegable de las ciudades */}
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                            style={{ width: undefined }}
                            selectedValue={country}
                            placeholder="Selecciona tu Pais"
                            placeholderStyle={{ color: '#007aff' }}
                            placeholderIconColor="#007aff"
                            onValueChange={(e) => setCountry(e)}
                        >
                            {countries.map((c) => {
                                return <Picker.Item
                                        key={c.code}
                                        label={c.name}
                                        value={c.name}
                                        />
                            })}

                        </Picker>
                    </Item>

                    {/*Boton para confirmar */}
                    <View style={{ width: '80%', alignItems: "center", marginTop: 20 }}>
                        <Button title="Confirmar" onPress={() => checkOut()} />
                    </View>
                </FormContainer>
            </KeyboardAwareScrollView>
        </View>
    )
}

//almacena y trae el storage del carrito de compra
const mapStateTopProps = (state) => {
    const { cartItems } = state;
    return{
        cartItems: cartItems,
    }
}

export default connect(mapStateTopProps)(Checkout)

const styles = StyleSheet.create({})
