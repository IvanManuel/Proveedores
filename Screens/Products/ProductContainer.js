//Archivo que contiene la seccion de produtos - App
import React, { useState, useCallback } from 'react'
import { StyleSheet, View, ActivityIndicator, FlatList, Dimensions, ScrollView, Platform} from 'react-native'
import { Container, Header, Icon, Input, Item, Text } from "native-base"
import { useFocusEffect } from '@react-navigation/native'
//para hacer las conexiones a la base de dato
import axios from 'axios'

//lista de productos
import ProductList from './ProductList'
//buscador
import SearchedProducts from './SearchedProducts'
//banner
import Banner from '../../Shared/Banner'
//
import CategoryFilter from './CategoryFilter'

//ruta de la base de datos
import baseURL from '../../assets/common/baseURL'


//obtenemos las dimensiones de la pantalla del celular
var { heigth } = Dimensions.get("window");

//json de productos para prueba
//const data = require("../../assets/data/products.json")
//json de categorias para prueba
//const productsCategories = require("../../assets/data/categories.json")


const ProductContainer = (props) => {
    //estado que almacena la estructura de un producto
    const [products, setProducts] = useState([])
    //estado que contiene la palabra que este en el buscador
    const [productsFiltered, setProductsFiltered] = useState([])
    //estado que se activa una vez posicionado en el buscador
    const [focus, setFocus] = useState()
    //estado que almacena la estructura de las categorias
    const [categories, setCategories] = useState([])
    //estado que almacena las categorias para filtrar en productos
    const [productsCtg, setProductsCtg] = useState([])
    //estado para activar cosas
    const [active, setActive] = useState()
    //estado que contiene todos los productos iniciales a mostrar
    const [initialState, setInitialState] = useState([])
    //estado que activa el loading (cargando)
    const [loading, setLoading] = useState(true)

    //
    useFocusEffect((
        useCallback(
            () => {
            //el valor incial que tienen todos los estados
        
        setFocus(false)        
        setActive(-1);
        
        //obteniendo los productos de la base de datos
        axios.get(`${baseURL}products`)
            .then((res) => {
                setProducts(res.data);
                setProductsFiltered(res.data);
                setProductsCtg(res.data)
                setInitialState(res.data)
                setLoading(false)
                //console.log(res.data);
            })
            .catch((e) => {
                console.log("MIERDA-product", e);
            })


        //obteniendo las categorias de la base de datos
        axios.get(`${baseURL}categories`)
            .then((res) => {
                setCategories(res.data)
                //console.log(res.data);
            })
            .catch((e) => {
                console.log("MIERDA-categories", e);
            })       

        return () => {
            setProducts([])
            setProductsFiltered([]);
            setFocus([])
            setCategories([]);
            setActive();
            setInitialState()
        }
            },
            [],
        )
    ))
        

    //funciona para convertir el texto de la barra del buscador en minuscular todas
    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    //funcion para activar el focus
    const openList = () => {
        setFocus(true)
    }

    //funcion para desactivar el focus
    const onBlur = () => {
        setFocus(false)
    }

    //funcion para filtrar productos por categorias
    const changeCtg = (ctg) => {
        {
            ctg === 'all'
            ? [setProductsCtg(initialState), setActive(true)]
            : [
                setProductsCtg(
                    products.filter((i) => i.category._id === ctg),
                    setActive(true)
                    //console.log(i.category.id)
                ),
                //console.log("setProductsCtg", productsCtg)
                //console.log("products", products)
            ]
        }
    }

    return (
        <>
            {loading == false 
            ? (
                <Container>
                {/*Barra del buscador */}
                <Header searchBar rounded> 
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="Buscar"
                            //si nos posicionamos en el buscador se activa el focus
                            onFocus={openList}
                            //si el texto cambia pasamos cualquier valor por searchProduct (que los combierte en minusculas)
                            onChangeText={(text) => searchProduct(text) }
                        />
                        {focus == true 
                        ? (
                            //aciva el iconoc de una cruz para cerrar la lista de la busqueda
                            <Icon onPress={onBlur} name="ios-close"/>
                        )
                        : null}
                    </Item>
                </Header>
                {/* */}
                {focus == true 
                ? (
                    <SearchedProducts
                        navigation={props.navigation}
                        productsFiltered={productsFiltered}
                    />
                )
                : (

                //Contenidos de los productos
                <ScrollView>
                    <View>
                        {/*Banner de imagenes */}
                        <View>
                            <Banner/>
                        </View>

                        {/*Filtrar productos por catgorias */}
                        <View>
                            <CategoryFilter
                                categories={categories}
                                categoryFilter={changeCtg}
                                productsCtg={productsCtg}
                                active={active}
                                setActive={setActive}
                            />
                        </View>

                        {productsCtg.length > 0
                        ? (
                            <View style={styles.listContainer}>
                                {/*Creamos una lista con los datos del json de prueba */}
                                {productsCtg.map((item) => {
                                    console.log(item.id);
                                    return(
                                        <ProductList
                                            navigation={props.navigation}
                                            key={item.id} //key={item.name}
                                            item={item}
                                        />
                                    )
                                })}
                            </View>
                        )
                        : (
                            <View style={[styles.center, { heigth: heigth / 2 }]}>
                                <Text>Ningun producto encontrado</Text>
                            </View>
                        ) 
                        }
                        
                    </View>
                </ScrollView> 
                )}            
            </Container> 
            )
            : (
                //espiner mientras cargan los datos de la base de datos
                <Container style={[styles.center, { backgroundColor: "#f2f2f2"}]}>
                    <ActivityIndicator size="large" color="red" />
                </Container>
            )} 
        </>    
    )
}

export default ProductContainer

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      listContainer: {
        height: heigth,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      center: {
          justifyContent: 'center',
          alignItems: 'center'
      }
})
