//archivo que muestra los productos en la base de datos - Navigator/AdminNavigator
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import { Header, Item, Input } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useFocusEffect } from '@react-navigation/native'
import ListItme from './ListItme'

import axios from 'axios'
import baseURL from '../../assets/common/baseURL'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EasyButton from '../../Shared/StyledComponents/EasyButton'

var { height, width } = Dimensions.get("window")

//funcion
const listHeader = () => {
    return(
        <View
        elevation={1}
        style={styles.listHeader}
    >
        <View style={styles.headerItem}></View>
        <View style={styles.headerItem}>
            <Text style={{fontWeight: '600'}}>Marca</Text>
        </View>
        <View style={styles.headerItem}>
            <Text style={{ fontWeight: '600'}}>Nombre</Text>
        </View>
        <View style={styles.headerItem}>
            <Text style={{ fontWeight: '600'}}>Categoria</Text>
        </View>
        <View style={styles.headerItem}>
            <Text style={{ fontWeight: '600'}}>Precio</Text>
        </View>
    </View>
    )
}

const Products = (props) => {

    //estado que almecena los productos
    const [productList, setProductList] = useState()
    //estado que almacena las categorias para filtrar productos
    const [productFilter, setProductFilter] = useState()
    //estado que almacena el cargando
    const [loading, setLoading] = useState(true)
    //estado que almacena el token del usuario
    const [token, setToken] = useState()

    useFocusEffect(
        useCallback(
            () => {
                //obtenemos el token del usuario y lo almacenamos
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))

                //obtenemos los productos de la base de datos
                axios.get(`${baseURL}products`)
                    .then((res) => {
                        //console.log("otro res", res.data)
                        setProductList(res.data)
                        setProductFilter(res.data)
                        setLoading(false)
                    })

                return () => {
                    setProductList()
                    setProductFilter()
                    setLoading(true)
                }
            },
            [],
        )
    )

    //funcion para la barra de busqueda
    const searchProduct = (text) => {
        //si no hay ndad en la barra de busqueda 
        if (text == "") {
            setProductFilter(productList)
        }
        //si tiene algo hacemos ul filtro por nombre 
        setProductFilter(
            productList.filter((i) => 
                i.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    //funcion para eliminar un producto de la base de datos
    const deleteProduct = (id) => {
        axios.delete(`${baseURL}products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            const products = productFilter.filter((item) => item.id !== id)
            setProductFilter(products)
        })
        .catch((error) => console.log(error))
    }

    //console.log("TOKEN", token)
    return (
        <View style={styles.container}>
            {/*barra superficial */}
            <View style={styles.buttonContainer}>
                {/*boton de ordenes */}
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Ordenes")}
                >
                    <Icon name="shopping-bag" size={18} color="white" />
                    <Text style={styles.buttonText}>Ordenes</Text>
                </EasyButton>

                {/*boton de productos */}
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Formulario de Productos")}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Productos</Text>
                </EasyButton>

                {/*boton de catgorias */}
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Categorias")}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Categorias</Text>
                </EasyButton>
            </View>

            <View>
                {/*creamos la barra de busqueda */}
                <Header searchBar rounded>
                    <Item style={{ padding: 5 }}>
                        <Icon name="search" />
                        <Input
                            placeholder="Buscar"
                            onChangeText={(text) => searchProduct(text)}
                        />
                    </Item>
                </Header>
            </View>

            {/*creamos un loading mientras se cargan los productos */}
            {loading
            ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />    
                </View>
            ) : (
                //creamos una lista con los productos
                <FlatList
                    data={productFilter}
                    ListHeaderComponent={listHeader}
                    renderItem={({ item, index}) => (
                        <ListItme
                            {...item}
                            navigation={props.navigation}
                            index={index}
                            delete={deleteProduct}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    )
}

export default Products

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
})
