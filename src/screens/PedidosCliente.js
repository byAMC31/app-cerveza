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

    // Logica para llamar la lista de documentos 
    useEffect(() => {
        const getListaPedidos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'pedidos'))
                const docs = []

                querySnapshot.forEach((doc) => {
                    const { nombre, domicilio, estado, repartidor, fecha, id_cliente,id_repartidor,latitude,longitude,montoTotal } = doc.data()
                    //Rescatamos solo los de este cliente|
                    if (id_cliente == userId) {
                        docs.push({
                            id: doc.id,
                            nombre,
                            domicilio,
                            estado,
                            repartidor,
                            fecha,
                            id_repartidor,
                            latitude,
                            longitude,
                            montoTotal
                        })

                    }
                })
                setListaPedidos(docs);
            }
            catch (error) {
                console.log(error);
            }
        }
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
                                    {pedido.repartidor != "Sin asignar" ? (
                                    <TouchableOpacity style={styles.boton} onPress={() => {
                                        props.navigation.navigate('MapaPedidoCliente', {
                                            pedido: pedido,
                                        })
                                    }}>
                                        <Text style={styles.texto_boton}>Seguimiento del pedido</Text>
                                    </TouchableOpacity>
                                    ) : null
                                    }

                                </ListItemContent>


                            </ListItem>
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
    boton: {
        backgroundColor: "#e40f0f",
        borderColor: "#e40f0f",
        borderWidth: 2,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    texto_boton: {
        textAlign: "center",
        padding: 10,
        color: "white",
        fontSize: 16,
    },
});