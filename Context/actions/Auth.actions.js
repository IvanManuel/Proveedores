//archivo que valida el login de un usuario - Context/actions/Auht.actions
import jwt_decode from "jwt-decode"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseURL";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

//funcion para verificar si el usuario existe en la base de datos y poder ser logeado
export const loginUser = (user, dispatch) => {
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const token = data.token;
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, user))
        } else {
           logoutUser(dispatch)
        }
    })
    .catch((err) => {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Usuario o contraseña incorrecto",
            text2: ""
        });
        logoutUser(dispatch)
    });
};

//funcion para obtener los datos del usuario logeado
export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

//funciona para cerra sesion, deshautenticar
export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}