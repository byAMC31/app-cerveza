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

export default function Carrito(props) {
    const [listaCarrito, setListaCarrito] = useState([]);
    const [montoTotal, setMontoTotal] = useState(0);
    // Logica para llamar la lista de documentos

    useEffect(() => {
        // 2. Usa getAuth() para obtener la instancia de autenticación
        const auth = getAuth();
        // 3. Recuperar la ID del usuario actualmente autenticado
        const userId = auth.currentUser?.uid;
        
        const getListaCarrito = async () => {
          try {
            if (userId) {
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
                console.log("" + precio);
                setMontoTotal(
                  (prevTotal) =>
                    prevTotal + parseInt(precio) * parseInt(cantidad)
                );
              });
              setListaCarrito(docs);
              console.log("monto " + montoTotal);
            }
          } catch (error) {
            console.log(error);
          }
        };
        getListaCarrito();
      }, []);

    return (
        <ScrollView>
            <View style={styles.contenedorPadre}>
                <Text>Productos</Text>
                {listaCarrito.map((producto) => (
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
                            <TouchableOpacity style={styles.boton_eliminar_producto}>
                                <Icon
                                    style={styles.icono}
                                    name="trash"
                                    size={22}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.tarjeta_boton_pedido}>
                <Text>Total a pagar: ${montoTotal.toString()},00</Text>
                <TouchableOpacity style={styles.boton}>
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
    }
});
