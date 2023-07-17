import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Picker,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

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

export default function ProductoEspecifico(props) {
    //Variable para buscar informacion de producto
    const [producto, setProducto] = useState({});

    const [cantidad, setCantidad] = useState(1);

    const sumar = () => {
        const nueva_cantidad= parseInt(cantidad + 1);
        setCantidad(nueva_cantidad);
    };

    const restar = () => {
        if(cantidad > 1) {
            const nueva_cantidad= parseInt(cantidad - 1);
            setCantidad(nueva_cantidad);
        }
    };
    
    const handleCantidadChange = (value) => {
        setCantidad(value);
        console.log(cantidad);
    };

    // Obtengo un producto en base al id del producto en la cerveza
    const getOneProduct = async (id) => {
        try {
            const docRef = doc(db, "cervezas", id);
            const docSnap = await getDoc(docRef);
            setProducto(docSnap.data());
        } catch (error) {
            console.log("Error");
        }
    };

    useEffect(() => {
        getOneProduct(props.route.params.idProducto);
    }, []);

    //   const id = props.route.params.productoId

    return (
        <View style={styles.contenedorPadre}>
            <View style={styles.tarjeta}>
                <View style={styles.contenedor}>
                    <Image source={{ uri: producto.img }} style={styles.img} />
                    <Text style={styles.texto_cerveza}>{producto.nombre} </Text>
                </View>
            </View>

            <View style={styles.tarjeta}>
                <View style={styles.contenedor}>
                    <Text style={styles.texto_cerveza}>{producto.nombre} </Text>
                    <Text style={styles.precio_cerveza}>${producto.precio},00 </Text>

                    <TouchableOpacity style={styles.boton_cantidad} onPress={restar}>
                        <Text style={styles.texto_cantidad}>-</Text>
                    </TouchableOpacity>

                    <TextInput style={styles.texto_input} value={cantidad.toString()} onChange={handleCantidadChange}></TextInput>

                    <TouchableOpacity style={styles.boton_cantidad} onPress={sumar}>
                        <Text style={styles.texto_cantidad}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.boton}>
                <Text style={styles.textoBoton}>Añadir al carrito</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover", // Ajusta la imagen al tamaño del contenedor
    },
    contenedorPadre: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    tarjeta: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        width: "90%",
        padding: 15,
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
        padding: 5,
    },
    img: {
        width: 213,
        height: 200,
        marginLeft: 30,
    },
    boton: {
        backgroundColor: "#e40f0f",
        borderColor: "#e40f0f",
        borderWidth: 2,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    boton_cantidad: {
        width:100,
        backgroundColor: "#e40f0f",
        borderColor: "#e40f0f",
        borderWidth: 2,
        borderRadius: 20,
        marginLeft: 90,
        marginRight: 20,
        marginTop: 20,
    },
    texto_cantidad: {
        textAlign: "center",
        padding: 2,
        color: "white",
        fontSize: 25,
    },
    textoBoton: {
        textAlign: "center",
        padding: 10,
        color: "white",
        fontSize: 16,
    },
    texto_input: {
        textAlign:"center",
        borderColor: "slategray",
        borderWidth: 1,
        padding: 5,
        marginTop: 5,
        borderRadius: 8,
        fontSize:20
    },
    texto_cerveza: {
        fontSize: 19,
        fontWeight: "bold",
        marginLeft: 26,
    },
    precio_cerveza: {
        fontSize: 19,
        fontWeight: "bold",
        marginLeft: 26,
        color: "#e40f0f",
    },
});
