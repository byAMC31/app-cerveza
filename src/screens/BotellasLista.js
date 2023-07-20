import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, ImageBackground, Image, TouchableOpacity,TouchableHighlight } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import appFirebase from '../credenciales.js';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import credenciales from '../credenciales';

const db = getFirestore(appFirebase)

import { ListItem, Avatar } from '@rneui/themed';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron.js';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content.js';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title.js';

export default function BotellasLista(props) {
    const navigation = useNavigation();
    const [lista, setLista] = useState([])
    const [botellas, setBotellas] = useState([]);


    const fetchData = async () => {
        try {
          const db = getFirestore(credenciales.appFirebase);
          const querySnapshot = await getDocs(collection(db, 'botellas'));
    
          const botellasData = querySnapshot.docs.map((doc) => doc.data());
          setBotellas(botellasData);
    
          const docs = querySnapshot.docs.map((doc) => {
            const { nombre, precio, img, existencia } = doc.data();
            return {
              id: doc.id,
              nombre,
              precio,
              img,
              existencia,
            };
          });
    
          setLista(docs);
          mostrarToast('Lista actualizada');
        } catch (error) {
          console.log(error);
        }
      };
    
      const mostrarToast = (mensaje) => {
        Toast.show({
          type: 'success',
          text1: mensaje,
          position: 'bottom',
          visibilityTime: 2000,
          autoHide: true,
        });
      };
      const handleAgregarBotella = () => {
       
        navigation.navigate('BotellasAgregar');
      };
    
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
        fetchData();
    },
        []
    )

    return (
        <ScrollView>
            <View style={styles.container}>
                        <Image style={styles.logo} source={require("../img/logo_login2.png")} />
                        </View>
            <View style={styles.buttonContainerRow}>
      <TouchableHighlight style={styles.buttonContainer} onPress={fetchData} underlayColor="#42911D">
        <Text style={styles.buttonText}>Actualizar Lista</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.buttonContainerAgregar} onPress={handleAgregarBotella} underlayColor="#007BFF">
        <Text style={styles.buttonText}>Agregar botella</Text>
      </TouchableHighlight>
    </View>
      {lista.map((botella) => (
        <ListItem
          key={botella.id}
          bottomDivider
          onPress={() => {
            navigation.navigate('BotellasDetalles', {
                botellaid: botella.id,

            });
          }}
        >
          <ListItem.Chevron />
          <Avatar
            rounded
            source={{ uri: botella.img }}
          />
          <ListItem.Content>
            <ListItem.Title>Nombre: {botella.nombre}</ListItem.Title>
            <ListItem.Subtitle>Precio: {botella.precio}</ListItem.Subtitle>
           
          </ListItem.Content>
        </ListItem>
      ))}

        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
<Toast />
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
    buttonContainer: {
        backgroundColor: '#46B114',
        borderColor: '#50B91E',
        borderWidth: 2,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },

      buttonContainerAgregar: {
        backgroundColor: '#007BFF', // Color azul
        borderColor: '#007BFF', // Color azul
        borderWidth: 2,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
      },

      buttonContainerRow: {
        flexDirection: 'row', // Colocar los botones en fila horizontal
        justifyContent: 'space-around', // Espaciar los botones equitativamente
        marginTop: 1, // Añadir margen superior para separar de la lista
        padding: 10,
      },
      container: {
        flex: 1, // Take the entire available space
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
      },
    
      logo: {
        width: 213,
        height: 120,
        marginBottom: 2,
        marginTop:5
      },
    
    });
    
    
    