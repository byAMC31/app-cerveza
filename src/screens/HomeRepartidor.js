import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import appFirebase from '../credenciales.js';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
const db = getFirestore(appFirebase)

import { ListItem } from '@rneui/themed';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content.js';

export default function HomeRepartidor(props) {
    const [listaPedidos, setListaPedidos] = useState([])

    // Logica para llamar la lista de documentos 
    useEffect(() => {
        const getListaPedidos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'pedidos'))
                const docs = []

                querySnapshot.forEach((doc) => {
                    const { email, estado, id_autentificacion, latitude, longitude, montoTotal, nombre,domicilio,pedido } = doc.data()
                    docs.push({
                        id: doc.id,
                        email,
                        estado,
                        id_autentificacion,
                        latitude,
                        longitude,
                        montoTotal,
                        nombre,
                        domicilio,
                        pedido
                    })
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
            <View style={styles.main_contenedor}>
                <Text style={styles.texto_pedidos_activos}>Pedidos disponibles</Text>
                    {
                        listaPedidos.map((pedido) => (
                            <View style={styles.card} key={pedido.id}>
                            <ListItem  key={pedido.id}>
                                <ListItemContent>
                                    <Text style={styles.texto_pedido_etiqueta}>Nombre: </Text>
                                    <Text style={styles.texto_pedido}>{pedido.nombre}</Text>
                                    <Text style={styles.texto_pedido_etiqueta}>Dirección: </Text>
                                    <Text style={styles.texto_pedido}>{pedido.domicilio}</Text>
                                    <TouchableOpacity style={styles.boton} onPress={() => {
                                        props.navigation.navigate('MapaPedido', {
                                            dataCliente: pedido
                                        })
                                    }}>
                                        <Text style={styles.texto_boton}>Aceptar pedido</Text>
                                    </TouchableOpacity>
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
    main_contenedor: {
        flex: 1
    },
    card: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: '90%',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
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
        marginLeft: 70,
        marginRight: 20,
        marginTop: 10,
    },
    texto_boton: {
        textAlign: "center",
        padding: 10,
        color: "white",
        fontSize: 16,
    },
    texto_pedidos_activos:{
        textAlign: "center",
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    texto_pedido:{
        marginTop:5
    },
    texto_pedido_etiqueta:{
        fontWeight:'bold'

    }
    
});