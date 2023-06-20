//archivo que contiene los articulos agreados al carrito - Cart/Cart
import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Left, Right, H1, ListItem, Thumbnail, Body } from "native-base"

const CartItem = (props) => {
    //guardamos en data todas la propiedades
    const data = props.item;
    console.log("dataAQUI", data);

    //estado que almacena la cantida del producto
    const [quantity, setQuantity] = useState(props.item.quantity)


    return (
        <ListItem
            style={styles.listItem}
            key={Math.random()}
            avatar
        >
            <Left>
                <Thumbnail source={{ uri: data.item.product.image ? data.item.product.image : 'https://lh3.googleusercontent.com/proxy/uQvR9ndsIDeJiK1ke7FElMh0iiSW3XHFkHpQgE2uGa_t4bdxksM4jGvMiPkRrIvgDvhIMb7A9fk22ENqIlT8-E7QHJpriTf6iOMrY2AkhANCCxvpXTl3_s2OSqB8-YKR'}} />
            </Left>

            <Body style={styles.body}>
                <Left>
                    <Text>{data.item.product.name}</Text>
                </Left>
                <Right>
                    <Text>${data.item.product.price}</Text>
                </Right>
            </Body>
        </ListItem>
    )
}

export default CartItem

const styles = StyleSheet.create({
    listItem:{
        alignItems: "center",
        backgroundColor: 'white',
        justifyContent: 'center'
      },
      body:{
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
      },
})
