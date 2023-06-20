//archivo para mostrar las empresas del carrito de compras - BusinessList
import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native'
import Toast from 'react-native-toast-message'

//metodo para conectar el store de redux
import { connect } from 'react-redux'
//importamos las acciones que usara el carrito de compras
import * as actions from '../../Redux/Actions/cartActions'
//archivo que contiene estilos para los botones
import EasyButton from '../../Shared/StyledComponents/EasyButton'

//obtenemos las dimensiones de la pantalla del celular
var { width } = Dimensions.get("window");

const BusinessCard = (props) => {
    //descomponemos estos valores de las propiedades pasadas por el padre
    const { name, price, image, countInStock } = props

    return (
        <View style={styles.container}>
            {/*Imagenes */}
            <Image 
                style={styles.image}
                resizeMode="contain"
                source={{uri: image ? image : 'https://lh3.googleusercontent.com/proxy/uQvR9ndsIDeJiK1ke7FElMh0iiSW3XHFkHpQgE2uGa_t4bdxksM4jGvMiPkRrIvgDvhIMb7A9fk22ENqIlT8-E7QHJpriTf6iOMrY2AkhANCCxvpXTl3_s2OSqB8-YKR'}}
            />
            <View style={styles.card}/>
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3)
                    + '...' : name
                }
            </Text>
            <Text style={styles.price}>$ {price}</Text>

            { countInStock > 0
            ? (
                <View style={{ marginBottom: 60 }}>
                    <EasyButton 
                        primary
                        medium
                        onPress={() => {
                            props.addItemToCart(props),
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${name} agregado al carrito`,
                                text2: "Ve al carrito para completar la orden"
                            })
                        }}
                    >
                        <Text style={{ color: "white"}}>Agregar</Text>
                    </EasyButton>
                </View>
            )
            : <Text style={{ marginTop: 20 }}>Actualmente no disponible</Text>}
        </View>
    )
}

//funcion para agrear una empresa al carrito
const mapDispatchTopProps = (dispatch) => {
    return {
        addItemToCart: (business) =>
            dispatch(actions.addToCart({quantity: 1, business}))
    }
}

export default connect(null, mapDispatchTopProps)(BusinessCard)

const styles = StyleSheet.create({
    container:{
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 30,
        marginLeft:10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white',
    },
    image:{
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45,
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center'
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})
