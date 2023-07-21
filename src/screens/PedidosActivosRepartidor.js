import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import appFirebase from '../credenciales.js';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
const db = getFirestore(appFirebase)
import { getAuth } from 'firebase/auth';

import { ListItem } from '@rneui/themed';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content.js';

export default function PedidosCliente(props) {
    const [listaPedidos, setListaPedidos] = useState([])
    //Id del usuario
    const auth = getAuth();
    // 3. Recuperar la ID del usuario actualmente autenticado
    const userId = auth.currentUser?.uid;
    const [repartidor, setRepartidor] = useState([])
    const obtenerRepartidor = async () => {
        try {
            const docRef = doc(db, "usuarios", userId);
            const docSnap = await getDoc(docRef);
            setRepartidor(docSnap.data());
        } catch (error) {
            console.log("Error repartidor " + error.message);
        }
    }
    // Logica para llamar la lista de documentos 
    useEffect(() => {
        const getListaPedidos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'pedidos'))
                const docs = []

                querySnapshot.forEach((doc) => {
                    const { nombre, domicilio, estado, repartidor, fecha, id_repartidor } = doc.data()
                    //Rescatamos solo los de este cliente|
                    if (id_repartidor == userId && estado == "En proceso de entrega") {
                        docs.push({
                            id: doc.id,
                            nombre,
                            domicilio,
                            estado,
                            repartidor,
                            fecha
                        })

                    }
                })
                setListaPedidos(docs);
            }
            catch (error) {
                console.log(error);
            }
        }
        obtenerRepartidor()
        getListaPedidos()
    },
        []
    )

    return (
        <ScrollView>
            <View >
                {
                    listaPedidos.map((pedido) => (
                        <View style={styles.card} key={pedido.id}>
                            <ListItem key={pedido.id}>
                                <ListItemContent>
                                <Text style={styles.texto_etiqueta}>Id pedido: </Text>
                                    <Text style={styles.texto_informacion}>{pedido.id}</Text>
                                    <Text style={styles.texto_etiqueta}>Nombre: </Text>
                                    <Text style={styles.texto_informacion}>{pedido.nombre}</Text>
                                    <Text style={styles.texto_etiqueta}>Dirección: </Text>
                                    <Text style={styles.texto_informacion}>{pedido.domicilio}</Text>
                                    <Text style={styles.texto_etiqueta}>Estado: </Text>
                                    <Text style={styles.texto_informacion}>{pedido.estado}</Text>
                                    <Text style={styles.texto_etiqueta}>Repartidor: </Text>
                                    <Text style={styles.texto_informacion}>{pedido.repartidor}</Text>
                                    <Text style={styles.texto_etiqueta}>Fecha: </Text>
                                    <Text style={styles.texto_informacion}>{pedido.fecha}</Text>
                                </ListItemContent>
                            </ListItem>
                            <TouchableOpacity style={styles.boton} onPress={() => {
                                props.navigation.navigate('MapaPedido', {
                                    data_cliente: pedido,
                                    data_repartidor: repartidor,
                                    id_pedido: pedido.id,
                                    id_repartidor: userId
                                })
                            }}>
                                <Text style={styles.texto_boton}>Ver pedido</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }


            </View>

        </ScrollView>


    );
}

const styles = StyleSheet.create({
    card: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
    ,
    texto_etiqueta: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 0
    },
    texto_informacion: {
        fontSize: 17,
        marginBottom: 0,
        color: "#e40f0f",
        fontWeight: "bold",
        marginLeft: 96
    },
});