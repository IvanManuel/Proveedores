//archivo funcion del buscador en Empresas - BusinessContainer
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Content, Left, Body, ListItem, Thumbnail, Text, Item } from 'native-base'


//obtenemos las dimensiones de la pantalla del celular
var { width } = Dimensions.get("window");


const SearchedBusiness = (props) => {
    //extraemos de las props el estado businessFiltered
    const { businessFiltered } = props
    return (
        <Content style={{ width: width }}>
            {/*si el contenido de la barra de busque es mayora  0 (tiene algo escrito*/}
            {businessFiltered.length > 0
            //mostramos todos las empresas en la base de datos
            ? ( businessFiltered.map((item) => (
                <ListItem
                    //al seleccionar un prodcuto filtrado
                    onPress={() => {
                        props.navigation.navigate("Business Detail", {item: item})
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
                        No se encontraron empresas con esas caracteristicas
                   </Text>
               </View> 
            )}
        </Content>
    );
};

export default SearchedBusiness

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
