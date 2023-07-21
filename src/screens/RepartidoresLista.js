import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableHighlight, StyleSheet, Image} from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import credenciales from '../credenciales';
import { ListItem, Avatar } from 'react-native-elements';
import Toast from 'react-native-toast-message';

const RepartidoresLista = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);

  const fetchData = async () => {
    try {
      const db = getFirestore(credenciales.appFirebase);
      const querySnapshot = await getDocs(collection(db, 'usuarios'));
  
      const usuariosData = querySnapshot.docs.map((doc) => doc.data());
  
      // Filtrar usuarios con el rol "repartidor"
      const repartidoresData = usuariosData.filter((usuario) => usuario.rol === 'repartidor');
  
      setUsuarios(repartidoresData);
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

  const handleAgregarRepartidor = () => {
       
    navigation.navigate('RepartidoresAgregar');
  };


  useEffect(() => {
    fetchData();
  }, []); // Dependencia vacía para ejecutar el efecto solo una vez al montar el componente

  return (
    <ScrollView>
         <View style={styles.container}>
                        <Image style={styles.logo} source={require("../img/logo_login2.png")} />
                        </View>

                        <View style={styles.buttonContainerRow}>
      <TouchableHighlight style={styles.buttonContainer} onPress={fetchData} underlayColor="#42911D">
        <Text style={styles.buttonText}>Actualizar Lista</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.buttonContainerAgregar} onPress={handleAgregarRepartidor} underlayColor="#007BFF">
        <Text style={styles.buttonText}>Agregar Repartidor</Text>
      </TouchableHighlight>
    </View>

      {usuarios.map((usuario) => (
        <ListItem
          key={usuario.email}
          bottomDivider
          onPress={() => {
            navigation.navigate('UsuariosDetalles', {
              useremail: usuario.email,
            });
          }}
        >
          <ListItem.Chevron />
          <Avatar
            rounded
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1920/1920623.png' }}
          />
          <ListItem.Content>
            <ListItem.Title>Nombre: {usuario.nombre}</ListItem.Title>
            <ListItem.Subtitle>Edad: {usuario.edad}</ListItem.Subtitle>
            <ListItem.Subtitle>Email: {usuario.email}</ListItem.Subtitle>
            <ListItem.Subtitle>Password: {usuario.password}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}

        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
<Toast />
    </ScrollView>
  );
};

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

export default RepartidoresLista;
