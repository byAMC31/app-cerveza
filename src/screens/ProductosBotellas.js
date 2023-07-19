import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import appFirebase from '../credenciales.js';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
const db = getFirestore(appFirebase)

import { ListItem, Avatar } from '@rneui/themed';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content.js';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title.js';

export default function ProductosBotellas(props) {
    const [lista, setLista] = useState([])

    // Logica para llamar la lista de documentos 
    useEffect(() => {
        const getLista = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'botellas'))
                const docs = []

                querySnapshot.forEach((doc) => {
                    const { nombre, precio, img, existencia } = doc.data()
                    docs.push({
                        id: doc.id,
                        nombre,
                        precio,
                        img,
                        existencia
                    })
                })

                setLista(docs);
            }
            catch (error) {
                console.log(error);
            }
        }
        getLista()
    },
        []
    )

    return (
        <ScrollView>
            <View style={styles.contenedor}>
                {
                lista.map((botella) => (
                    <ListItem bottomDivider key={botella.id}>

                        <ListItemContent>
                            <Image source={{ uri: botella.img }} style={styles.img} />
                            <ListItemTitle>{botella.nombre}</ListItemTitle>
                            <Text>${botella.precio},00</Text>
                            <TouchableOpacity style={styles.boton} onPress={()=>{props.navigation.navigate('ProductoBotella',{
                                idProducto : botella.id
                            })}}>
                                <Text style={styles.textoBoton}>Comprar</Text>
                            </TouchableOpacity>
                        </ListItemContent>
                    </ListItem>
                ))
                }
            </View>

        </ScrollView>


    );
}

const styles = StyleSheet.create({
    contenedor: {
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
        elevation: 5
    }
    ,
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
    img: {
        width: 213,
        height: 200,
        marginBottom: 20,
        marginLeft: 18,
    },

});