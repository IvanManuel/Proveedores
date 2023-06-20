//archivo funcion del buscador en Productos - ProductContainer
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Content, Left, Body, ListItem, Thumbnail, Text, Item } from 'native-base'


//obtenemos las dimensiones de la pantalla del celular
var { width } = Dimensions.get("window");


const SearchedProducts = (props) => {
    //extraemos de las props el estado productsFiltered
    const { productsFiltered } = props
    return (
        <Content style={{ width: width }}>
            {/*si el contenido de la barra de busque es mayora  0 (tiene algo escrito*/}
            {productsFiltered.length > 0
            //mostramos todos los productos en la base de datos
            ? ( productsFiltered.map((item) => (
                <ListItem
                    //al seleccionar un prodcuto filtrado
                    onPress={() => {
                        props.navigation.navigate("Product Detail", {item: item})
                    }}
                    key={item.id}
                    avatar
                >
                    {/*mostramos al lado izquier la imagen */}
                    <Left>
                        <Thumbnail
                            source={{uri: item.image ? item.image : '../../assets/noimg.jpg'}}
                        />
                    </Left>
                    <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.description}</Text>
                    </Body>
                </ListItem>
                ))
                )
            //si el texto no coindice
            : (
               <View style={styles.center}>
                   <Text style={{ alignSelf: 'center'}}>
                        No se encontraron productos con esas caracteristicas
                   </Text>
               </View> 
            )}
        </Content>
    );
};

export default SearchedProducts

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
