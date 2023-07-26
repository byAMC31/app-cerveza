import React, { useState, useEffect } from "react";
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
// import * as LocationGeocoding from 'expo-location';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import appFirebase from "../credenciales.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    getDoc, updateDoc
} from "firebase/firestore";
const db = getFirestore(appFirebase);
const casa = require('../img/home.png');
const moto = require('../img/moto.png');



import MapView, { Marker } from "react-native-maps";


export default function MapaPedidoCliente(props) {

    //Vamos a necesitar el id del repartidor para poder consultar sus coordenadas
    //Vamos a necesitar el id del cliente para saber sus coordenadas
    // Define los estados para las coordenadas del cliente y repartidor
    const [latitude_cliente, setLatitudeCliente] = useState(null);
    const [longitude_cliente, setLongitudeCliente] = useState(null);
    const [latitude_repartidor, setLatitudeRepartidor] = useState(null);
    const [longitude_repartidor, setLongitudeRepartidor] = useState(null);

    //Saco las coordenadas del pedido del repartidor 
    // Saco las coordenadas del pedido del repartidor
    const get_coordenadas_repartidor = async () => {
        try {
            const docRef = doc(db, "usuarios", id_repartidor);
            const docSnap = await getDoc(docRef);
            setLatitudeRepartidor(docSnap.data().latitude);
            setLongitudeRepartidor(docSnap.data().longitude);
            console.log("Coordenadas repartidor " + docSnap.data().latitude + " " + docSnap.data().longitude);
        } catch (error) {
            console.log("Error getOneProduct " + error.message);
        }
    };
    // Saco las coordenadas del cliente
    const data_pedido = () => {
        setLatitudeCliente(props.route.params.pedido.latitude);
        setLongitudeCliente(props.route.params.pedido.longitude);
        id_repartidor = props.route.params.pedido.id_repartidor;
        console.log("Latitud cliente " + latitude_cliente);
        console.log("Longitud cliente " + longitude_cliente);
        console.log("id repartidor" + id_repartidor);
    };


    useEffect(() => {
        data_pedido();
        get_coordenadas_repartidor();

        const intervalId = setInterval(() => {
            get_coordenadas_repartidor();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    
    return (
        <ScrollView>

            <View style={styles.contenedorPadre}>
                <MapView
                    style={styles.mapa}

                    initialRegion={{
                        latitude: 17.1096424,
                        longitude: -96.699529,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.04
                    }}

                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    zoomTapEnabled={true}
                >

                    {latitude_cliente !== null && longitude_cliente !== null && (
                        <Marker
                            coordinate={{
                                latitude: latitude_cliente,
                                longitude: longitude_cliente,
                            }}
                            image={casa}
                        />
                    )}

                    {latitude_repartidor !== null && longitude_repartidor !== null && (
                        <Marker
                            coordinate={{
                                latitude: latitude_repartidor,
                                longitude: longitude_repartidor,
                            }}
                            image={moto}
                        />
                    )}

                    {latitude_repartidor !== null && longitude_repartidor !== null && latitude_cliente !== null && longitude_cliente && (
                        <MapViewDirections
                            origin={
                                {
                                    latitude: latitude_repartidor,
                                    longitude: longitude_repartidor,
                                }
                            }
                            destination={

                                {
                                    latitude: latitude_cliente,
                                    longitude: longitude_cliente
                                }

                            }
                            apikey={'AIzaSyAUdkB54pEC6UvbTpcLKDftlT5cM8CnrRM'}
                            strokeColor='red'

                            strokeWidth={3}
                        />
                    )}
                </MapView>
                {/* <Text> {destination.address}</Text> */}
            </View>



        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedorPadre: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
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
    botonw: {
        backgroundColor: "#1ACB32",
        borderColor: "#1ACB32",
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
        fontSize: 16,
        fontWeight: "bold",
    },
    mapa: {
        width: 350,
        height: 450,
    },
});