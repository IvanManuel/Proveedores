//archivo para tener un control de las ordenes de los productos - Screen/Admin/Order
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";

import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import baseURL from "../assets/common/baseURL";

//varaibles de numero de referencia sobre el estado de una orden
const codes = [
  { name: "Pendiente", code: "3" },
  { name: "Enviando", code: "2" },
  { name: "Entregado", code: "1" },
];

const OrderCard = (props) => {

    //estado que almacena el estado de la orden(Pendiente, enviado, entregado)
    const [orderStatus, setOrderStatus] = useState();
    //estado que almacena 
    const [statusText, setStatusText] = useState();
    //estdo que almacena los tipos de estados de un pedido
    const [statusChange, setStatusChange] = useState();
    //estado que almacena el token de usuario
    const [token, setToken] = useState();

    const [cardColor, setCardColor] = useState();

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status == "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("Pendiente");
      setCardColor("#E74C3C");
    } else if (props.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("Enviando");
      setCardColor("#F1C40F");
    } else if (props.status == "1"){
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("Entregado");
      setCardColor("#2ECC71");
    } else {
        null
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  //funcion para actualizar el estado de una orden
  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    //
    axios.put(`${baseURL}orders/${props.id}`, order, config)
        .then((res) => {
            if (res.status == 200 || res.status == 201) {
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Orden Editada",
                text2: "",
            });
            setTimeout(() => {
                props.navigation.navigate("Products");
            }, 500);
            }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Algo salio mas",
          text2: "Por favor intenta de nuevo",
        });
      });
  };

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
        <Text>Numero de la Orden: #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Estado: {statusText} {orderStatus}
        </Text>
        <Text>
          Direccion: {props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text>Ciudad: {props.city}</Text>
        <Text>Pais: {props.country}</Text>
        <Text>Datos de la orden: {props.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Precio: </Text>
          <Text style={styles.price}>$ {props.totalPrice}</Text>
        </View>
        
        {props.editMode ? (
          <View>
            <Picker
              mode="dropdown"
              iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={statusChange}
              placeholder="Change Status"
              placeholderIconColor={{ color: "#007aff" }}
              onValueChange={(e) => setStatusChange(e)}
            >
              {codes.map((c) => {
                return (
                  <Picker.Item key={c.code} label={c.name} value={c.code} />
                );
              })}
            </Picker>
            <EasyButton
                secondary 
                large 
                onPress={() => updateOrder()}
            >
              <Text style={{ color: "white" }}>Actualizar</Text>
            </EasyButton>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default  OrderCard

const styles = StyleSheet.create({
    container: {
      padding: 20,
      margin: 10,
      borderRadius: 10,
    },
    title: {
      backgroundColor: "#62B1F6",
      padding: 5,
    },
    priceContainer: {
      marginTop: 10,
      alignSelf: "flex-end",
      flexDirection: "row",
    },
    price: {
      color: "white",
      fontWeight: "bold",
    },
  });