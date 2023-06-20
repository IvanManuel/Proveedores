import React, { useState, useCallback} from "react"
import { View, FlatList, Text, StyleSheet} from "react-native"
import axios from "axios"
import baseURL from "../../assets/common/baseURL"
import { useFocusEffect } from "@react-navigation/native"

import OrderCard from "../../Shared/OrderCard"


const Order = (props) => {

    const [orderList, setOrderList] = useState();

    useFocusEffect(
        useCallback(
            () => {
                getOrders();
            return () => {
                setOrderList();
            }
            },
        [],
        )
    )


    //obtenemos las ordenes
    const getOrders = () => {
        axios.get(`${baseURL}orders`)
        .then((x) => {
            setOrderList(x.data);
            console.log(x.data);
        })
        .catch((error) => console.log(error))
    }

    return (
        <View>
            { orderList
            ? (
                <View>
                    <FlatList 
                        data={orderList}
                        renderItem={({ item }) => (
                            <OrderCard navigation={props.navigation} {...item} editMode={true}/>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            ) : (
                <View>
                    <Text>No hay ordenes pendientes</Text>
                </View>
            )}
        </View>
    )
}

export default Order

const styles = StyleSheet.create({})
