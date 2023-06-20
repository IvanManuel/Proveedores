//archivo que muestra el perfil de usuario registrado  - Navigator/UserNavigatior
import React, { useState, useContext, useCallback } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { Container } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import OrderCard from '../../Shared/OrderCard'

import axios from 'axios'
import baseURL from '../../assets/common/baseURL'

import AuthGlobal from '../../Context/store/AuthGlobal'
import { logoutUser } from '../../Context/actions/Auth.actions'
import { useEffect } from 'react/cjs/react.development';


const UserProfile = (props) => {

    const context = useContext(AuthGlobal)
    //estado que almacena los datos del usuario
    const [userProfile, setUserProfile] = useState()
    //estado que almacena las ordernes
    const [orders, setOrders] = useState()
    

    //validamos que este un usuario registrado
    useFocusEffect(
        useCallback(() => {
        //si la autenticacion en falsa o nula retornamos a login
        if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

        //obtenemos los datos del usuario por id desde base de datos
        AsyncStorage.getItem("jwt")
            .then((res) => {
                console.log("RES", res);
                axios.get(`${baseURL}users/${context.stateUser.user.userId}`, {
                    headers: { Authorization: `Bearer ${res}` },
                })
                .then((user) => setUserProfile(user.data))
                console.log("context", context.stateUser.user.userId);
                console.log("User",userProfile);
                console.log("Context1",user.data); 
                
                
            })
            .catch((error) => console.log(error))
        
        axios.get(`${baseURL}orders`)
            .then((x) => {
                //guardamos todo los datos en data
                const data = x.data;
                //console.log("USerORDER", data);
                //console.log("context", context.stateUser.user);
                //filtramos solo las ordenes que sean igual al id del usuario logeado
                const userOrders = data.filter((order) => order.user.id === context.stateUser.user.userId);
                
                setOrders(userOrders);
                //console.log("UserORders", userOrders);
                
                
            })
            .catch((error) => console.log("ERROR",error))

            
        return () => {
            setUserProfile()
            setOrders()
        }
        

    }, [context.stateUser.isAuthenticated]))

    //console.log("ORDER", orders);
    return (
        <Container style={styles.container}>
           <ScrollView contentContainerStyle={styles.subContainer}>
               <Text style={{ fontSize: 30 }}>
                   {userProfile ? userProfile.name : "" }
               </Text>
               <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : ""}
                    </Text>
               </View>
               <View style={{ marginTop: 20 }}>
                    <Button title={"Cerrar Sesion"} onPress={() => [
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]}/>
               </View>

               {/*las ordenes del usuario */}
               <View style={{ marginTop: 20, marginBottom: 60}}>
                   <Text style={{ fontSize: 20 }}>Mis Ordenes</Text>
                   <View>
                       {orders
                       ? (
                            orders.map((x) => {
                            return <OrderCard key={x.id} {...x} />;
                            })
                       ) : (
                            <View style={styles.order}>
                                <Text>Tu no tienes ordenes</Text>
                            </View>
                       )}                                                
                   </View>
               </View>
               
           </ScrollView>
       </Container>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})
