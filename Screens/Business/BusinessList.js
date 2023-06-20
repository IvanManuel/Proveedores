//archivo para mostrar una lista de las empresas de MongoDBAtlas - BusinessContainer
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

import BusinessCard from './BusinessCard';

//obtenemos las dimensiones de la pantalla del celular
var { width } = Dimensions.get("window");

const BusinessList = (props) => {
    //obtenemos las props de BusinessContainer (items)
    const { item } = props;

    return (
        //al presionar en una empresa redirigimos a la pagina de detalles y pasamos las propiedades de dicha empresa
        <TouchableOpacity 
            style={{ width: '50%'}}
            onPress={() =>
                props.navigation.navigate("Business Detail", { item: item })
            }
        >
            <View style={{ width: width / 2, backgroundColor: 'gainsboro'}}>
                <BusinessCard {...item}/>
            </View>
        </TouchableOpacity>
    )
}

export default BusinessList

const styles = StyleSheet.create({})
