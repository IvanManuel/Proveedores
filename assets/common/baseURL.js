//archivo que conecta la app con la base de datos en la ruta espesificada
import { Platform } from "react-native";

let baseURL = 'https://cacapftapp-backend.herokuapp.com/api/v1/';

/*{Platform.OS == 'android'
? baseURL = 'http://192.168.0.109:3010/api/v1/'
: baseURL = 'http://localhost:3010/api/v1/'
}*/

export default baseURL