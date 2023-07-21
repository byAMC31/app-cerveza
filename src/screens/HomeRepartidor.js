import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import appFirebase from '../credenciales.js';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
const db = getFirestore(appFirebase)

import { ListItem } from '@rneui/themed';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content.js';
import { getAuth } from 'firebase/auth';

import Icon from "react-native-vector-icons/FontAwesome";

export default function HomeRepartidor(props) {
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
    const getListaPedidos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'pedidos'))
            const docs = []
            querySnapshot.forEach((doc) => {
                const { email, estado, id_cliente, latitude, longitude, montoTotal, nombre, domicilio, pedido, repartidor,fecha } = doc.data()
                if (repartidor == "Sin asignar") {
                    docs.push({
                        id: doc.id,
                        email,
                        estado,
                        id_cliente,
                        latitude,
                        longitude,
                        montoTotal,
                        nombre,
                        domicilio,
                        pedido,
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

    // Logica para llamar la lista de documentos 
    useEffect(() => {
        obtenerRepartidor()
        getListaPedidos()
    },
        [] //esto consume muchas lecturas
    )

    return (
        <ScrollView>
            <TouchableOpacity style={styles.boton_pedido} onPress={() => props.navigation.navigate('PedidosActivosRepartidor')}>
                        <Icon
                            style={styles.icono}
                            name="list-ul"
                            size={30}
                            color="white"
                        />
                        <Text>Pedidos activos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton_pedido} onPress={() => props.navigation.navigate('PedidosRealizadosRepartidor')}>
                        <Icon
                            style={styles.icono}
                            name="list-ul"
                            size={30}
                            color="white"
                        />
                        <Text>Pedidos realizados</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={getListaPedidos}            >
                <Text style={styles.texto_boton}>Actualizar pedidos</Text>
            </TouchableOpacity>

            <View style={styles.main_contenedor}>
                <Text style={styles.texto_pedidos_activos}>Bienvenido repartidor: {repartidor.nombre}</Text>
                <Text style={styles.texto_pedidos_activos}>Pedidos disponibles</Text>
                {
                    listaPedidos.map((pedido) => (
                        <View style={styles.card} key={pedido.id}>
                            <ListItem key={pedido.id}>
                                <ListItemContent>
                                <Text style={styles.texto_pedido_etiqueta}>Id pedido: </Text>
                                    <Text style={styles.texto_pedido}>{pedido.id}</Text>
                                    <Text style={styles.texto_pedido_etiqueta}>Nombre: </Text>
                                    <Text style={styles.texto_pedido}>{pedido.nombre}</Text>
                                    <Text style={styles.texto_pedido_etiqueta}>Dirección: </Text>
                                    <Text style={styles.texto_pedido}>{pedido.domicilio}</Text>
                                    <Text style={styles.texto_pedido_etiqueta}>Fecha y hora: </Text>
                                    <Text style={styles.texto_pedido}>{pedido.fecha}</Text>
                                    <TouchableOpacity style={styles.boton} onPress={() => {
                                        props.navigation.navigate('MapaPedido', {
                                            data_cliente: pedido,
                                            data_repartidor: repartidor,
                                            id_pedido: pedido.id,
                                            id_repartidor: userId
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
    texto_pedidos_activos: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    texto_pedido: {
        marginTop: 5
    },
    texto_pedido_etiqueta: {
        fontWeight: 'bold'

    },
    boton_pedido: {
        backgroundColor: "#e40f0f",
        borderColor: "#e40f0f",
        borderWidth: 2,
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 210,
        marginTop: 15,
    },

});