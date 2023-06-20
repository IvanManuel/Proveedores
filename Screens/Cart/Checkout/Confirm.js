//archivo que confirma la compra del carrito de compras - Navigator/CheckoutNavigator 
import React from 'react'
import { StyleSheet, View, Dimensions, ScrollView, Button } from 'react-native'
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";
//para realizar la conexion con el storage de redux 
import { connect } from 'react-redux'
import * as actions from "../../../Redux/Actions/cartActions";
import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from '../../../assets/common/baseURL';


//obtenemos las dimensiones de la pantalla del celular
var { height, width } = Dimensions.get("window");

const Confirm = (props) => {

    //obtenemos el formulario del metodo de pago
    const finalOrder = props.route.params;

    //funcion ppar guardar las ordenes en base de dato
    const confirmOrder = () => {
        //guardamos la orden
        const order = finalOrder.order.order;
        axios.post(`${baseURL}orders`, order)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Orden Completada",
                text2: "",
              });
              //limpiamos el carrito y volvemos 
              setTimeout(() => {
                props.clearCart();
                props.navigation.navigate("Cart");
              }, 500);
            }
          })
          .catch((error) => {
            Toast.show({
              topOffset: 60,
              type: "error",
              text1: "Algo salio mal",
              text2: "Por favor intente de nuevo",
            });
          });
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
                    Confirmar Orden
                </Text>

                {/*si viene alguna orden mostrmos los datos */}
                {props.route.params
                ? <View style={{ borderWidth: 1, borderColor: 'orange' }}>
                    <Text style={styles.title}>Shipping to</Text>
                    <View style={{ padding: 8}}>
                        <Text>Direccion 1: { finalOrder.order.order.shippingAddress1 }</Text>
                        <Text>Direccion 2: { finalOrder.order.order.shippingAddress2 }</Text>
                        <Text>Ciudad: { finalOrder.order.order.city }</Text>
                        <Text>Codigo Postal: { finalOrder.order.order.zip }</Text>
                        <Text>Pais: { finalOrder.order.order.country }</Text>
                    </View>

                    <Text style={styles.title}>Elementos: </Text>
                    {finalOrder.order.order.orderItems.map((x) => {
                        return (
                            <ListItem
                                style={styles.listItem}
                                key={x.product.name}
                                avatar
                            >
                                <Left>
                                    <Thumbnail source={{ uri: x.product.image}} />
                                </Left>
                                <Body style={styles.body}>
                                    <Left>
                                        <Text>{x.product.name}</Text>
                                    </Left>
                                    <Right>
                                        <Text>${x.product.price}</Text>
                                    </Right>
                                </Body>
                            </ListItem>
                        )
                    })}
                </View>
                : null }

                <View style={{ alignItems: 'center', margin: 20 }}>
                    <Button title={'Realizar Pedido'} onPress={confirmOrder}/>
                </View>
            </View>
        </ScrollView>
    )
}

//funciones para quitar todo del carrito
const mapDispatchTopProps = (dispatch) => {
    return {
        //elimina todo
        clearCart: () => dispatch(actions.clearCart())
    }
}

export default connect(null, mapDispatchTopProps)(Confirm);

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: "center",
        backgroundColor: "white",
      },
      titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
      },
      title: {
        alignSelf: "center",
        margin: 8,
        fontSize: 16,
        fontWeight: "bold",
      },
      listItem: {
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
        width: width / 1.2,
      },
      body: {
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
      },
})
