//archivo que muestra los detalles de un solo producto - HomeNavigator
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native'
import { Left, Right, Container, H1 } from 'native-base'
import Toast from 'react-native-toast-message'

//metodo para conectar el store de redux
import { connect } from 'react-redux'
//importamos las acciones que usara el carrito de compras
import * as actions from '../../Redux/Actions/cartActions'
//archivo que contiene estilos para los botones
import EasyButton from '../../Shared/StyledComponents/EasyButton'
//
import TrafficLight from '../../Shared/StyledComponents/TrafficLight'

const SingleProduct = (props) => {

    const [item, setitem] = useState(props.route.params.item)
    //console.log(item.image);
    const [availability, setAvailability] = useState(null)
    const [availabilityText, setAvailabilityText] = useState("")

    //valida dependiendo la cantidad de articulos que halla calcula si el producto es disponible, limitado o indisponible
    useEffect(() => {
        if (props.route.params.item.countInStock == 0){
            setAvailability(<TrafficLight unavailable></TrafficLight>)
            setAvailabilityText("Indisponible")
        }
        else if(props.route.params.item.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>)
            setAvailabilityText("Limitado")
        }
        else {
            setAvailability(<TrafficLight available></TrafficLight>)
            setAvailabilityText("Disponible")
        }
        return () => {
            setAvailability(null)
             setAvailabilityText("")
        }
    }, [])

    return (
        <Container style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{
                            uri: item.image ? item.image : 'https://lh3.googleusercontent.com/proxy/uQvR9ndsIDeJiK1ke7FElMh0iiSW3XHFkHpQgE2uGa_t4bdxksM4jGvMiPkRrIvgDvhIMb7A9fk22ENqIlT8-E7QHJpriTf6iOMrY2AkhANCCxvpXTl3_s2OSqB8-YKR'
                        }}
                        resizeMode='contain'
                        style={styles.image}
                    />
                </View>

                <View style={styles.contentContainer}>
                        <H1 style={styles.contentHeader}>{item.name}</H1>
                        <Text style={styles.contentText}>{item.brand}</Text>
                        <Text style={styles.contentText}>{item.factory}</Text>
                </View>
                    
                {/*muestra con color si esta disponible, limitado o indisponible */}    
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}> 
                        <Text style={{ marginRight: 10}}>
                            Disponibilidad: {availabilityText}
                        </Text>
                        {availability}
                    </View>
                    <Text>{item.description}</Text>
                    <Text>{item.richDescription}</Text>
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}> 
                        <Text style={{ marginRight: 10}}>
                            Rating: {item.rating}
                        </Text>
                        {availability}
                    </View>
                    <Text>Number of Reviews{item.numReviews}</Text>
                    <Text>Desde la Fecha: {item.dateCreated}</Text>
                </View>

            </ScrollView>
            

            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>${item.price}</Text>
                </Left>
                <Right>
                    <EasyButton 
                        primary
                        medium
                        onPress={() => {
                            props.addItemToCart(item),
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${item.name} agregado al carrito`,
                                text2: "Ve al carrito para completar la orden"
                            })
                        }}
                    >
                        <Text style={{ color: "white"}}>Agregar</Text>
                    </EasyButton>
                </Right>
            </View>
        </Container>
    )
}

//funcion para agrear un producto al carrito
const mapDispatchTopProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({quantity: 1, product}))
    }
}


export default connect(null, mapDispatchTopProps)(SingleProduct)

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        marginRight: 10
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})
