//archivo para el metodo de pago del carrito de compras - Navigator/CheckoutNavigator
import React, { useState } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Picker, Icon, Body, Title } from 'native-base'

//los metodos de pago que ofrece la app
const methods = [
    { name: 'Efectivo', value: 1 },
    { name: 'Transferencia bancaria', value: 2 },
    { name: 'Pago con tarjeta', value: 3 }
]

//las opciones que tiene le metodo de pago Pago con tarjeta = 3 
const paymentCard = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'MasterCard', value: 3 },
    { name: 'Otra', value: 4 }
]

const Payment = (props) => {
    //obtenemos la orden que viene del checkout
    const order = props.route.params

    const [selected, setSelected] = useState()
    const [card, setCard] = useState()

    return (
        <Container>
            <Header>
                <Body>
                    <Title>Selecciona tu metodo de pago</Title>
                </Body>
            </Header>
            {/*mostarmos los petodos de pago */}
            <Content>
                {methods.map((item, index) => {
                    
                    return (
                        <ListItem key={item.name} onPress={() => setSelected(item.value)}>
                            <Left>
                                <Text>{item.name}</Text>
                            </Left>
                            <Right>
                                <Radio selected={selected == item.value} />
                            </Right>
                        </ListItem>
                    )
                })}

                {selected == 3
                ? (
                   <Picker
                        mode="dropdown"
                        iosIcon={<Icon name={"arrow-down"} />}
                        headerStyle={{ backgroundColor: 'orange' }}
                        headerBackButtonTextStyle={{ color: '#fff' }}
                        headerTitleStyle={{ color: '#fff' }}
                        selectedValue={card}
                        onValueChange={(x) => setCard(x)}
                   >
                       {paymentCard.map((c, index) => {
                           return <Picker.Item 
                            key={c.name} 
                            label={c.name} 
                            value={c.name}
                           />
                       })}
                   </Picker>
               ) : null }

                <View style={{ margin: 20, alignSelf: 'center' }}>
                       <Button 
                       title={"Confirmar"} 
                       onPress={() => props.navigation.navigate("Confirmar", { order }, 
                       //console.log("CONFIRM",order)
                       )}
                       />
                </View>
            </Content>
        </Container>
    )
}

export default Payment

const styles = StyleSheet.create({})
