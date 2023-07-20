import React, { useState, useEffect } from "react";
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import * as LocationGeocoding from 'expo-location';

import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Alert
} from "react-native";


import { ScrollView } from "react-native-gesture-handler";
import { getAuth } from 'firebase/auth';
import appFirebase from "../credenciales.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    getDoc,
} from "firebase/firestore";
const db = getFirestore(appFirebase);

import { ListItem, Avatar } from "@rneui/themed";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content.js";
import Icon from "react-native-vector-icons/FontAwesome";

import MapView, { Marker, Polyline } from "react-native-maps";


export default function Carrito(props) {
    const [userIdLocal, setUserIdLocal] = useState(''); //id del usuario
    const [listaCarrito, setListaCarrito] = useState([]);
    const [montoTotal, setMontoTotal] = useState(0);

    const [ubicacion, setUbicacion] = React.useState({
        latitude: 17.078097,
        longitude: -96.744962,
        address: ''
    });

    const [destination, setDestination] = React.useState({
        latitude: 17.082220,
        longitude: -96.742451
    });

    
    const dataCliente = () =>{
        console.log(props.route.params.dataCliente)
    }
    useEffect(() => {
    }, []);

    return (
        <ScrollView>

            <View style={styles.contenedorPadre}>
                <Text>Ubicación donde llegará su pedido</Text>
                <MapView
                    style={styles.mapa}

                    initialRegion={{
                        latitude: ubicacion.latitude,
                        longitude: ubicacion.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.04
                    }}

                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    zoomTapEnabled={true}
                >
                    
                    <Marker
                        draggable
                        coordinate={ubicacion}
                        onDragEnd={(ubicacion) => setUbicacion(ubicacion.nativeEvent.coordinate)}
                    />

                    <MapViewDirections
                        origin={ubicacion}

                        apikey={'AIzaSyBQ1LkKAkng61lFZCcFuHXmGFLYcpc9Oq8'}

                    />
                </MapView>
                <Text> {ubicacion.address}</Text>
            </View>
            
            <View style={styles.tarjeta_boton_pedido}>
                <Text>Total a pagar: ${montoTotal.toString()},00</Text>
                <TouchableOpacity style={styles.boton}>
                    <Text style={styles.textoBoton} onPress={dataCliente}>Realizar pedido</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedorPadre: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contenedor_carrito_vacio: {
        margin: 120,
    },
    icono_contenedor: {
        justifyContent: "center", // Alineación vertical al centro
        alignItems: "center", // Alineación horizontal al centro
        marginRight: 10, // Espacio adicional si es necesario
    },
    icono: {
        padding: 8,
    },
    tarjeta: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        width: "90%",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    tarjeta_boton_pedido: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: "90%",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    boton: {
        backgroundColor: "#e40f0f",
        borderColor: "#e40f0f",
        borderWidth: 2,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    boton_eliminar_producto: {
        backgroundColor: "#e40f0f",
        borderColor: "#e40f0f",
        borderWidth: 2,
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
    },
    textoBoton: {
        textAlign: "center",
        padding: 10,
        color: "white",
        fontSize: 16,
    },
    texto_producto: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
    texto_precio: {
        color: "black",
        fontSize: 14,
    },
    mapa: {
        width: 300,
        height: 300,
    },
});
