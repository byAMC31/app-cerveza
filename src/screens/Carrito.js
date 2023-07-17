import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import appFirebase from '../credenciales.js';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
const db = getFirestore(appFirebase)

export default function Carrito(props) {

    const [usuario, setUsuario] = useState()

    // Obtengo un producto en base al id del producto en la cerveza
    const getCarrito = async () => {
        const querySnapshot = await getDocs(collection(db, "usuarios", "VWDAjmJxzXkaf0OY03SM", "carrito"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    };

    useEffect(() => {
        getCarrito();
    }, []);

    return (
        <ScrollView>
            <View style={styles.contenedorPadre}>
                <View style={styles.tarjeta}>
                    <View style={styles.contenedor}>

                        <Text style={styles.texto_bienvenido}>Botellas</Text>
                        <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate("HomeCliente")}>
                            <Text style={styles.textoBoton}>Comprar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.boton} >
                    <Text style={styles.textoBoton}>Realizar pedido</Text>
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
    tarjeta: {
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
    contenedor: {
        padding: 20,
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
    textoBoton: {
        textAlign: "center",
        padding: 10,
        color: "white",
        fontSize: 16,
    },
    logo: {
        width: 213,
        height: 120,
        marginBottom: 20,
        marginLeft: 18,
    },
});
