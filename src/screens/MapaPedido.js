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

let la;
let lo;
export default function MapaPedido(props) {

    const dataCliente = () => {
        const data = props.route.params.data_cliente;
        //console.log(props.route.params.dataCliente.pedido); 
        la = data.latitude;
        lo = data.longitude;
    }

    dataCliente();

    const [destination] = React.useState({
        latitude: la,
        longitude: lo
    });

    const [origin, setOrigin] = React.useState({
        latitude: 19.082220,
        longitude: -96.742451
    });

    const iniciarPedido = async () => {
        try {
            const documentoRef = doc(db, 'pedidos', props.route.params.id_pedido);
            await updateDoc(documentoRef, {
                'repartidor': props.route.params.data_repartidor.nombre,
                'estado': "En proceso de entrega",
                'id_repartidor': props.route.params.id_repartidor
            });
            console.log('Atributo actualizado correctamente.');
        } catch (error) {
            console.error('Error al actualizar el atributo:', error);
        }
        props.navigation.navigate('HomeRepartidor')
    }

    const pedidoEnDomicilio = async () => {
        try {
            const documentoRef = doc(db, 'pedidos', props.route.params.id_pedido);
            await updateDoc(documentoRef, {
                'estado': "Pedido en domicilio",
            });
            console.log('Atributo actualizado correctamente.');
        } catch (error) {
            console.error('Error al actualizar el atributo:', error);
        }
        props.navigation.navigate('HomeRepartidor')
    }
    const completarPedido = async () => {
        try {
            const documentoRef = doc(db, 'pedidos', props.route.params.id_pedido);
            await updateDoc(documentoRef, {
                'estado': "Completado",
            });
            console.log('Atributo actualizado correctamente.');
        } catch (error) {
            console.error('Error al actualizar el atributo:', error);
        }
        props.navigation.navigate('HomeRepartidor')
    }

    const actualizar_coordenadas_repartidor = async () => {
        if (props.route.params.data_cliente.id_repartidor !== "Sin asignar") {
            try {
                const documentoRef = doc(db, 'usuarios', props.route.params.data_cliente.id_repartidor);
                await new Promise((resolve, reject) => {
                    updateDoc(documentoRef, {
                        'latitude': origin.latitude,
                        'longitude': origin.longitude
                    }).then(() => {
                        console.log('Coordenadas del repartidor actualizadas correctamente.');
                        resolve(); // Resuelve la promesa para continuar el flujo de ejecución
                    }).catch((error) => {
                        console.error('Error al actualizar el atributo:', error);
                        reject(); // Rechaza la promesa para propagar el error
                    });
                });
            } catch (error) {
                console.error('Error al actualizar el atributo:', error);
            }
        }
    };


    useEffect(() => {
        dataCliente();
        // getLocationPermission();
        
        // Actualiza la ubicación actual cada segundo (1000 milisegundos)
        const intervalId = setInterval(() => {
            getLocationPermission();     
        }, 5000);
        
        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, [origin]);


    async function getLocationPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permiso denegado');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const current = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        setOrigin(current);
        actualizar_coordenadas_repartidor();
        console.log(current)
    }

    const enviarMensajeWhatsApp = () => {
        const botId = '111613305345690';
        //const phoneNbr = '+52'+'9514998080';
        const phoneNbr = '+52' + props.route.params.data_cliente.telefono_cliente;

        const bearerToken = 'EAAR1melTAP0BAI4Y4JAAueqhJrH1UnI8FoqolukqRiuAe9deJF414Mb3UGHPWu5YqbqsHYtpJR87IHx2gfZAYqQocnsVbqCqcqNlUjeHOHcYb5PVGAETjb1Rwo7c2MfI0CM2YLWz1rO2bdNSqddYwaB5Jc2ISa65ZCltn02pIQD2jsAjr0c1jLgfIGTgMZCzXzP8MqS5AZDZD';

        const url = 'https://graph.facebook.com/v17.0/' + botId + '/messages';
        const data = {
            messaging_product: 'whatsapp',
            to: phoneNbr,
            type: 'template',
            template: {
                name: 'hello_world',
                language: { code: 'en_US' }
            }
        };

        const postReq = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + bearerToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            json: true
        };

        fetch(url, postReq)
            .then(data => data.json())
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
    };

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

                    <Marker
                        coordinate={origin}
                        image={moto}
                    />

                    <Marker
                        //  draggable
                        coordinate={destination}
                        image={casa}
                    //   onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
                    />


                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={'AIzaSyBQ1LkKAkng61lFZCcFuHXmGFLYcpc9Oq8'}
                        strokeColor='red'

                        strokeWidth={3}
                    />
                </MapView>
                <Text> {destination.address}</Text>
            </View>

            <View style={styles.tarjeta_boton_pedido}>
                {props.route.params.data_cliente.estado === 'Recibido' ? (
                    <TouchableOpacity style={styles.boton} onPress={iniciarPedido}>
                        <Text style={styles.textoBoton}>Iniciar pedido</Text>
                    </TouchableOpacity>
                ) : props.route.params.data_cliente.estado === 'En proceso de entrega' ? (
                    <TouchableOpacity style={styles.boton} onPress={pedidoEnDomicilio}>
                        <Text style={styles.textoBoton}>Pedido en domicilio</Text>
                    </TouchableOpacity>
                ) : props.route.params.data_cliente.estado === 'Pedido en domicilio' ? (
                    <TouchableOpacity style={styles.boton} onPress={completarPedido}>
                        <Text style={styles.textoBoton}>Completar</Text>
                    </TouchableOpacity>
                ) : null}



                <Text style={styles.texto_precio}>Detalles de pedido         Total: ${props.route.params.data_cliente.montoTotal},00</Text>
                <View>
                    {props.route.params.data_cliente.pedido.map((item) => (
                        <Text key={item.id}>
                            {item.cantidad}    {item.nombre}
                        </Text>
                    ))}
                </View>

                <TouchableOpacity style={styles.botonw} onPress={enviarMensajeWhatsApp}>
                    <Text style={styles.textoBoton}>Enviar WhatsApp</Text>
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