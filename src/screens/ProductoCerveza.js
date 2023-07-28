import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Picker,
    Alert
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

export default function ProductoCerveza(props) {
    //Variable para buscar informacion de producto
    const [producto, setProducto] = useState({});

    //Variable para cantidad a pedir
    const [cantidadPedir, setCantidadPedir] = useState(1);

    let existenciaProducto = 0;
    
    
    const sumar = () => {
        
        existenciaProducto = producto.existencia
        if (cantidadPedir < existenciaProducto) {
            const nueva_cantidad = parseInt(cantidadPedir + 1);
            setCantidadPedir(nueva_cantidad);
        }
    };

    const restar = () => {
        if (cantidadPedir > 1) {
            const nueva_cantidad = parseInt(cantidadPedir - 1);
            setCantidadPedir(nueva_cantidad);
        }
    };

    const handleCantidadPedirChange = (value) => {
        setCantidadPedir(value);
        console.log(cantidadPedir);
    };

    // Obtengo un producto en base al id del producto en la cerveza
    const getOneProduct = async (id) => {
        try {
            const docRef = doc(db, "cervezas", id);
            const docSnap = await getDoc(docRef);
            setProducto(docSnap.data());
        } catch (error) {
            console.log("Error getOneProduct " + error.message);
        }
    };

    useEffect(() => {
        // 2. Usa getAuth() para obtener la instancia de autenticación
        const auth = getAuth();
        // 3. Recuperar la ID del usuario actualmente autenticado
        const userId = auth.currentUser?.uid;
        getOneProduct(props.route.params.idProducto);
    }, []);

    const saveProducto = async() =>{
        try {
            const productoGenerado = {
              cantidad: cantidadPedir,
              precio: producto.precio,
              nombre: producto.nombre
            }
            // 2. Usa getAuth() para obtener la instancia de autenticación
            const auth = getAuth();
            // 3. Recuperar la ID del usuario actualmente autenticado
            const userId = auth.currentUser?.uid;
            console.log(userId);
            await addDoc(collection(db,'usuarios',userId, "carrito"),{
              ...productoGenerado
            })
            Alert.alert('Producto añadido','¡Producto agregado al carrito!')
            props.navigation.navigate('HomeCliente')
          
        } catch (error) {
            console.log("Aqui esta el error")
          console.log(error);
        }
      }

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

                    <TextInput style={styles.texto_input} value={cantidadPedir.toString()} onChange={handleCantidadPedirChange}></TextInput>

                    <TouchableOpacity style={styles.boton_cantidad} onPress={sumar}>
                        <Text style={styles.texto_cantidad}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.boton} onPress={saveProducto} >
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
        width: 100,
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
        textAlign: "center",
        borderColor: "slategray",
        borderWidth: 1,
        padding: 5,
        marginTop: 5,
        borderRadius: 8,
        fontSize: 20
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
