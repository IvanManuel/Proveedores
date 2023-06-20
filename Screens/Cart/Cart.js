//pagina principal del carrito de compras - Navigators/Main
import React, { useContext } from 'react'
import { StyleSheet, View, Dimensions,  TouchableOpacity } from 'react-native'
import { Container, Text, Left, Right, H1} from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome'
import { SwipeListView } from 'react-native-swipe-list-view'

import AuthGlobal from '../../Context/store/AuthGlobal'
import Login from '../User/Login'

//obtenemos las dimensiones de la pantalla del celular
var { height, width } = Dimensions.get("window");

//metodo para conectar el store de redux
import { connect } from 'react-redux'
//las acciones que tiene el carrito de compra
import * as actions from '../../Redux/Actions/cartActions'
//archivo que contiene la lista de los productos agregados al carrito
import CartItem from './CartItem'
//archivo que contiene estilos para los botones
import EasyButton from '../../Shared/StyledComponents/EasyButton'


const Cart = (props) => {
    //console.log("NAVEGACION", props.navigation.navigate);

    const context = useContext(AuthGlobal)

    //variable del total del precio a pagar del carrito
    var total = 0;
    //hace la suma total del precio de los articulos en el carrito
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    });

    //console.log(props.cartItems);
    return (
        <>
            {props.cartItems.length
            ? (
                <Container>
                    <H1 style={{ alignSelf: "center" }}>Carrito</H1>
                    {/*Muestra la lista del carrito de compras */}
                    <SwipeListView
                     style={{ marginBottom: 60}}
                        data={props.cartItems}
                        renderItem={(data) => (
                            <CartItem item={data}/>
                        )}
                        //agrega el boton de papalera
                        renderHiddenItem={(data) => (
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity 
                                    style={styles.hiddenButton}
                                    onPress={() => props.removeFromCart(data.item)}
                                >
                                    <Icon name="trash" color={"white"} size={30} />
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                    />

                    {/*muestra el precio total y los botones */}
                    <View style={styles.bottomContainer}>
                        <Left>
                            <Text style={styles.price}>
                                $ {total.toFixed(1)}
                            </Text>
                        </Left>
                        <Right>
                            <EasyButton 
                                danger
                                medium
                                //accion para limpiar el carrito de compras
                                onPress={() => props.clearCart()}
                            >
                                <Text style={{ color: "white"}}>Limpiar</Text>
                            </EasyButton>
                        </Right>
                        <Right >
                            {context.stateUser.isAuthenticated
                            ? (
                                <EasyButton 
                                primary
                                medium
                                onPress={() => props.navigation.navigate('Checkout')}
                            >
                                <Text style={{ color: "white"}}>Verificar</Text>
                            </EasyButton>
                            )
                            : (
                                <EasyButton
                                    secondary
                                    medium
                                    onPress={() => props.navigation.navigate("Login")}
                                >
                                    <Text style={{ color: 'white' }}>Login</Text>
                                </EasyButton>
                            )}
                        </Right>
                    </View>

                </Container>
            )
            : (
                <Container style={styles.emptyContainer}>
                    <Text>Parece que tu carrito está vacío</Text>
                    <Text>Agregue productos a su carrito para comenzar</Text>
                </Container>
            )}
        </>
    )
}

//almacena y trae el storage del carrito de compra
const mapStateTopProps = (state) => {
    const { cartItems } = state;
    return{
        cartItems: cartItems,
    }
}

//funciones para quitar todo y eliminar uno del producto al carrito
const mapDispatchTopProps = (dispatch) => {
    return {
        //elimina todo
        clearCart: () => dispatch(actions.clearCart()),
        //quita solo uno
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

export default connect(mapStateTopProps, mapDispatchTopProps)(Cart);

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: "center",
        justifyContent: "center",
      },
      bottomContainer: {
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          left: 0,
          backgroundColor: 'white',
          elevation: 20
      },
      price: {
          fontSize: 18,
          margin: 20,
          color: 'red'
      },
      hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
      },
      hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
      }
    });
