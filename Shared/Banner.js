//archivo banner de la app - ProductContainer
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native'
import Swiper from 'react-native-swiper'


//obtenemos las dimensiones de la pantalla del celular
var { width } = Dimensions.get("window");

const Banner = () => {
    const [bannerData, setBannerData] = useState([])
    //
    useEffect(() => {
        setBannerData(["https://images.pexels.com/photos/163046/welcome-to-our-home-welcome-tablet-an-array-of-163046.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/3039036/pexels-photo-3039036.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/3800834/pexels-photo-3800834.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"])

        return () => {
            setBannerData([])
        }
    }, [])
//9.92 4:36
    return (
        <ScrollView>
            <View style={styles.containr}>
                <View style={styles.swiper}>
                    {/*mostramos el carousel de imagenes */}
                    <Swiper
                        style={{ height: width / 2 }}
                        //oculta los botones para pasar de imagen en imagen
                        showsButtons={false}
                        //reproduce las imagenes de forma automatica
                        autoplay={true}
                        //el tiempo en se pasan las imagenes
                        autoplayTimeout={2}
                    >
                        {/*imagenes */}
                        {bannerData.map((item) => {
                            return(
                                <Image
                                    key={item}
                                    style={styles.imageBenner}
                                    resizeMode="contain"
                                    source={{uri: item }}
                                />
                            )
                        })}
                    </Swiper>
                    <View style={{ height: 20}}></View>
                </View>
            </View>
        </ScrollView>   
    )
}

export default Banner

const styles = StyleSheet.create({
    containr:{
        flex: 1,
        backgroundColor: 'gainsboro'
    },
    swiper: {
        width: width,
        height: width / 2,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    imageBenner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})
