//archivo usado para editar y agregar productos. - Navigators/AdminNavigator - ListITem
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import { Item, Picker } from 'native-base'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import Error from '../../Shared/Error'
import Icon  from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseURL from '../../assets/common/baseURL'
import axios from 'axios'
import * as ImagePicker from "expo-image-picker"
import mime from 'mime'


const ProductForm = (props) => {
    //console.log("PORPS", props);

    const [pickerValue, setPickerValue] = useState()
    const [brand, setBrand] = useState()
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [mainImage, setMainImage] = useState()
    const [category, setCategory] = useState()
    const [categories, setCategories] = useState([])
    const [token, setToken] = useState()
    const [error, setError] = useState()
    const [countInStock, setCountInStock] = useState()
    const [rating, setRating] = useState(0)
    const [isFeatured, setIsFeatured] = useState(false)
    const [richDescription, setRichDescription] = useState()
    const [numReviews, setNumReviews] = useState(0)
    const [item, setItem] = useState(null)


    //
    useEffect(() => {
        
        //si no vienen item para editar
        if(!props.route.params) {
            setItem(null);
        } else {
            setItem(props.route.params.item);
            setBrand(props.route.params.item.brand);
            setName(props.route.params.item.name);
            setPrice(props.route.params.item.price.toString());
            setDescription(props.route.params.item.description);
            setMainImage(props.route.params.item.image);
            setImage(props.route.params.item.image);
            setCategory(props.route.params.item.category._id);
            setCountInStock(props.route.params.item.countInStock.toString());
        }
        //console.log("PROPS", props.route.params.item._id);
        //console.log("ITEM", item.id);

        //obtenemos el token del usuario
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))

        //obtenemos todas las categorias
        axios.get(`${baseURL}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) => alert("Error al cargar las categorias"));

        //funcion para dar permiso a la camara
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Debe de dar permisos a la camara para continuar")
                }
            }
        })();

        return () => {
            setCategories([])
        }
    }, [])
    console.log("PARAMS", props.route.params);
    //funcion para guardar imagenes desde la galeria
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        //console.log("RESULT", result);
        

        if (result.cancelled === false) {
            setMainImage(result.uri)
            setImage(result.uri);
            console.log("RESULTURI", result.uri);
        }
        
        //console.log("IAMGE", image);
        //console.log("RESULTMain", mainImage);
    };
    
    console.log("ITEM", item);
    //funcion para agregar o actualizar un producto
    const addProduct = () => {
        if (            
            name == "" ||
            brand == "" ||
            price == "" ||
            description == "" ||
            countInStock == ""
        ) {
            setError("Por favor complete el formulario correctamente")
        }

        let formData = new FormData();

        //const newImageUri = "file:///" + image.split("file:/").join("");
        //const newImageUri = Platform.OS === "ios" ? image.replace('file://', '') : image
        //console.log(newImageUri);

        formData.append("image", {
            uri : image,
            type: mime.getType(image),
            name: image.split("/").pop()
        }); 
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("richDescription", richDescription);
        formData.append("rating", rating);
        formData.append("numReviews", numReviews);
        formData.append("isFeatured", isFeatured);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        };
        //console.log("CONFIG", config);
        console.log("FORMDATA", formData);
        //console.log("newImageUri", newImageUri);
        const algo = {
            name,
            description,
            richDescription,
            image,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured
        }
        
       
        if(item !== null) {
            console.log("ITEM", item.id);
            //const formjson = JSON.stringify(formData)
            console.log("ALGO", algo);
            //Actualizamos un producto
            axios.put(`${baseURL}products/${item.id}`, algo, {headers: {
                Authorization: `Bearer ${token}`
            }})
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Producto Actualizado",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Products");
                        }, 700)
                    } 
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Algo salió mal",
                        text2: "Por favor intentelo de nuevo"
                    })
                    console.log("ERROR", error);
                })
        } else {
            //agregamos un producto a la base de datos
            axios.post(`${baseURL}products`, formData, config)
            .then((res) => {     
                //console.log("RES", res.status)           
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Nuevo producto agregado",
                        text2: ""
                    });
                    
                    setTimeout(() => {
                        props.navigation.navigate("Products");
                    }, 700)
                } 
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Algo salió mal",
                    text2: "Por favor intentelo de nuevo"
                })
                console.log("ERROR", error);
                console.log("RES", error.status);
            })
        }
        
    }

    


    return (
        <FormContainer title={item == null ? "Agregar Nuevo Producto" : "Editar Producto"}> 
            {/*Imagen */}
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    source={{ uri: mainImage}}
                />
                <TouchableOpacity 
                    style={styles.imagePicker}
                    onPress={pickImage}
                >
                    <Icon style={{color: "white"}} name="camera" />
                </TouchableOpacity>
            </View>

            {/*Marca */}
            <View style={styles.label}> 
                <Text  style={{ textDecorationLine: "underline"}}>Marca</Text>
            </View>
            <Input
                placeholder="Marca"
                name="brand"
                id="brand"
                value={brand}
                onChangeText={(text) => setBrand(text)}
            />

            {/*nombre */}
            <View style={styles.label}> 
                <Text style={{ textDecorationLine: "underline"}}>Nombre</Text>
            </View>
            <Input
                placeholder="Nombre"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            {/*Precio */}
            <View style={styles.label}> 
                <Text style={{ textDecorationLine: "underline"}}>Precio</Text>
            </View>
            <Input
                placeholder="Precio"
                name="price"
                id="price"
                value={price}
                keyboardType={"numeric"}
                onChangeText={(text) => setPrice(text)}
            />

            {/*Stock */}
            <View style={styles.label}> 
                <Text style={{ textDecorationLine: "underline"}}>Cantidad de Stock</Text>
            </View>
            <Input
                placeholder="Cantidad de Stock"
                name="stock"
                id="stock"
                value={countInStock}
                keyboardType={"numeric"}
                onChangeText={(text) => setCountInStock(text)}
            />

            {/*Descripcion */}
            <View style={styles.label}> 
                <Text style={{ textDecorationLine: "underline"}}>Descripcion</Text>
            </View>
            <Input
                placeholder="Descripcion"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />

            {/*seleccion de categorias */}
            <Item picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    style={{ width: undefined}}
                    placeholder="Selecciona la categoria"
                    selectedValue={pickerValue}
                    placeholderStyle={{ color: "#007aff"}}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                >
                    {categories.map((c) => {
                        return <Picker.Item key={c._id} label={c.name} value={c._id} />
                    })}
                </Picker>
            </Item>

            {error ? <Error message={error} /> : null }

            <View style={styles.buttonContainer}>
                <EasyButton
                    primary
                    large
                    onPress={() => addProduct()}
                >
                    <Text style={styles.buttonText}>Agregar</Text>
                </EasyButton>
            </View>
        </FormContainer>
    )
}

export default ProductForm

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 15,
        borderRadius: 100,
        elevation: 20
    }
})
