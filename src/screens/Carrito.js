import React, { useState, useEffect } from "react";
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

import {
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";


import { ScrollView, TextInput } from "react-native-gesture-handler";
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
    setDoc,
} from "firebase/firestore";
const db = getFirestore(appFirebase);

import { ListItem, Avatar } from "@rneui/themed";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content.js";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title.js";
import Icon from "react-native-vector-icons/FontAwesome";

import MapView, { Marker, Polyline } from "react-native-maps";


export default function Carrito(props) {
    const [userIdLocal, setUserIdLocal] = useState(''); //id del usuario
    const [listaCarrito, setListaCarrito] = useState([]);
    const [montoTotal, setMontoTotal] = useState(0);

    const [ubicacion, setUbicacion] = React.useState({
        latitude: 17.078097,
        longitude: -96.744962
    });

    const [destination, setDestination] = React.useState({
        latitude: 17.082220,
        longitude: -96.742451
    });

    //Datos del usuario
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        // 2. Usa getAuth() para obtener la instancia de autenticación
        const auth = getAuth();
        // 3. Recuperar la ID del usuario actualmente autenticado
        const userId = auth.currentUser?.uid;
        setUserIdLocal(userId);
        getListaCarrito(userId);
    }, []);

    const getListaCarrito = async (userId) => {
        try {
            if (userId) {
                //Obtenemos al usuario primero
                getOneUser(userId);

                const querySnapshot = await getDocs(
                    collection(db, "usuarios", userId, "carrito")
                );
                const docs = [];

                querySnapshot.forEach((doc) => {
                    const { cantidad, nombre, precio } = doc.data();
                    docs.push({
                        id: doc.id,
                        cantidad,
                        nombre,
                        precio,
                    });
                    // console.log("" + precio);
                    setMontoTotal(
                        (prevTotal) =>
                            prevTotal + parseInt(precio) * parseInt(cantidad)
                    );
                });
                setListaCarrito(docs);
                setUserIdLocal(userId)
                // console.log("monto " + montoTotal);
            }
        } catch (error) {
            console.log(error);
        }

    };

    const deleteProducto = async (id) => {
        console.log(db + " usuarios " + userIdLocal + " carrito " + id);
        try {
            Alert.alert(
                "Eliminar producto",
                "¿Estás seguro de eliminar el producto del carrito?",
                [
                    {
                        text: "Cancelar",
                        style: "cancel",
                    },
                    {
                        text: "Eliminar",
                        onPress: async () => {
                            await deleteDoc(
                                doc(db, "usuarios", userIdLocal, "carrito", id)
                            );

                            setMontoTotal(0);
                            getListaCarrito(userIdLocal);
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const getOneUser = async (id) => {
        try {
            const docRef = doc(db, "usuarios", id);
            const docSnap = await getDoc(docRef);
            setUsuario(docSnap.data());
        } catch (error) {
            console.log("Error al obtener al usuario " + error.message);
        }
    };

    const eliminarContenidoCarrito = async () => {
        try {
            const carritoRef = collection(db, 'usuarios', userIdLocal, 'carrito');
            const querySnapshot = await getDocs(carritoRef);

            // Eliminar cada documento de la colección "carrito"
            const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
            await Promise.all(deletePromises);

        } catch (error) {
            console.error('Error al eliminar contenido del "carrito":', error);
        }
    };

    const realizarPedido = async () => {
        try {
            // Verificar si la listaCarrito está vacía
            if (listaCarrito.length === 0) {
                Alert.alert('Carrito vacío', 'No hay productos en el carrito para realizar el pedido.');
                return; 
            }

            // Mostrar la alerta de confirmación antes de realizar el pedido
            Alert.alert(
                'Confirmar pedido',
                '¿Estás seguro de realizar el pedido?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Aceptar',
                        onPress: async () => {
                            // Crear el pedido si el usuario acepta
                            const pedido = {
                                email: usuario.email,
                                nombre: usuario.nombre,
                                latitude: ubicacion.latitude,
                                longitude: ubicacion.longitude,
                                pedido: listaCarrito,
                                montoTotal: montoTotal,
                                estado: "Por entregar"
                            };
                            await addDoc(collection(db, 'pedidos'), { ...pedido });
                            eliminarContenidoCarrito();

                            Alert.alert('Pedido realizado', '¡El pedido se ha realizado correctamente, pronto llegará a su casa :,)!');
                            props.navigation.navigate('HomeCliente');
                            // console.log(pedido);
                        },
                    },
                ],
                { cancelable: false } // Evitar que se pueda cerrar la alerta tocando fuera de ella
            );
        } catch (error) {
            console.log(error);
        }
        // console.log(ubicacion);
    }

    React.useEffect(() => {
        getLocationPermission();
    }, [])


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

        setUbicacion(current);
    }


    return (
        <ScrollView>
            <View style={styles.contenedorPadre}>
                <Text style={styles.texto_producto}>Productos</Text>
                {listaCarrito.length === 0 ? (
                    <View style={styles.contenedor_carrito_vacio}>
                        <Text>Aún no ha cargado ningún producto a su carrito</Text>
                    </View>
                ) : (
                    listaCarrito.map((producto) => (
                        <View style={styles.tarjeta} key={producto.id}>
                            <ListItem key={producto.id}>
                                <ListItemContent>
                                    <Text style={styles.texto_producto}>{producto.nombre}</Text>
                                    <Text style={styles.texto_precio}>
                                        Precio: ${producto.precio} c/u
                                    </Text>
                                    <Text style={styles.texto_precio}>
                                        Cantidad: {producto.cantidad} pz(s)
                                    </Text>
                                </ListItemContent>
                            </ListItem>
                            <View style={styles.icono_contenedor}>
                                <TouchableOpacity
                                    style={styles.boton_eliminar_producto}
                                    onPress={() => deleteProducto(producto.id)}
                                >
                                    <Icon
                                        style={styles.icono}
                                        name="trash"
                                        size={22}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}

            </View>







            <View style={styles.contenedorPadre}>
                <Text>Escoje la ubicación donde llegará tu pedido</Text>
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
                        coordinate={ubicacion}
                    />
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
            </View>

            <View style={styles.tarjeta_boton_pedido}>
                <Text>Total a pagar: ${montoTotal.toString()},00</Text>
                <TouchableOpacity style={styles.boton}>
                    <Text style={styles.textoBoton} onPress={realizarPedido}>Realizar pedido</Text>
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
