//archivo de la cabecera - App
import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
//import SafeAreaView from 'react-native-safe-area-view';


//obtenemos las dimensiones de la pantalla del celular
var { width } = Dimensions.get("window");

const Header = () => {
    return (
        <View style={styles.header}> 
            <Image
                source={require("../assets/ProveedoresLogoLargo.png")}
                resizeMode="contain"
                style={{ height: 60}}
            />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header:{
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
    }
})
