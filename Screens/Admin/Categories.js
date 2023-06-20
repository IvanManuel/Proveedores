//archvio para administrar las categorias - AdminNavigator
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput } from 'react-native'

import baseURL from '../../assets/common/baseURL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EasyButton from '../../Shared/StyledComponents/EasyButton'

var { width } = Dimensions.get("window")

const Item = (props) => {
    return (
        <View style={styles.item}>
            <Text>{props.item.name}</Text>
            <EasyButton
                danger
                medium
                onPress={() => props.delete(props.item._id)}
            >
                <Text style={{ color: "white", fontWeight: "bold"}}>Eliminar</Text>
            </EasyButton>
        </View>
    )
}

const Categories = (props) => {

    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        //obtenemos el token del usuario
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        //obtenemos todas las categorias
        axios.get(`${baseURL}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) => alert("Error al cargar las categorias"))

        return () => {
            setCategories();
            setToken();
        }
    }, [])

    //funcion para agregar una nuev categoria
    const addCategory = () => {
        const category = {
            name: categoryName,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };


        axios.post(`${baseURL}categories`, category, config)
            .then((res) => setCategories([...categories, res.data]))
            .catch((error) => alert("Error al cargar categorias"))

        setCategoryName("");
    }

    //funcion para eliminar una categoria por id
    const deleteCategory = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.delete(`${baseURL}categories/${id}`, config)
            .then((res) => {
                const newCategories = categories.filter((item) => item.id !== id);
                setCategories(newCategories)
            })
            .catch((error) => alert("Error al cargar categorias"))

    }

    return (
        <View style={{ position: "relative", height: "100%"}} > 
            <View style={{ marginBottom: 60}}>
                <FlatList
                    data={categories}
                    renderItem={({ item, index}) => (
                        <Item item={item} index={index}  delete={deleteCategory}/>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={ styles.bottomBar}>
                <View>
                    <Text>Agregar Categoria</Text>
                </View>
                <View style={{ width: width / 2.5 }}> 
                    <TextInput
                        style={styles.input}
                        value={categoryName}
                        onChangeText={(text) => setCategoryName(text)}
                    />
                </View>
                <View>
                    <EasyButton
                        primary
                        medium
                        onPress={() => addCategory()}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }}>Enviar</Text>
                    </EasyButton>
                </View>
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: "white",
        width: width,
        height: 60,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    },
    item: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5
    }
})
