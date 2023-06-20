//archivo para mostrar una lista de los productos de MongoDBAtlas - ProductContainer
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

import ProductCard from './ProductCard';

//obtenemos las dimensiones de la pantalla del celular
var { width } = Dimensions.get("window");

const ProductList = (props) => {
    //obtenemos las props de ProductContainer (items)
    const { item } = props;

    return (
        //al presionar en un producto redirigimos a la pagina de detalles y pasamos las propiedades de dicho producto
        <TouchableOpacity 
            style={{ width: '50%'}}
            onPress={() =>
                props.navigation.navigate("Product Detail", { item: item })
            }
        >
            <View style={{ width: width / 2, backgroundColor: 'gainsboro'}}>
                <ProductCard {...item}/>
            </View>
        </TouchableOpacity>
    )
}

export default ProductList

const styles = StyleSheet.create({})
