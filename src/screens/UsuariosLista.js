import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import credenciales from '../credenciales';
import { ListItem, Avatar } from 'react-native-elements';
import Toast from 'react-native-toast-message';

const UsuariosLista = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);

  const fetchData = async () => {
    try {
      const db = getFirestore(credenciales.appFirebase);
      const querySnapshot = await getDocs(collection(db, 'usuarios'));

      const usuariosData = querySnapshot.docs.map((doc) => doc.data());
      setUsuarios(usuariosData);
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

  useEffect(() => {
    fetchData();
  }, []); // Dependencia vacía para ejecutar el efecto solo una vez al montar el componente

  return (
    <ScrollView>
      <TouchableHighlight style={styles.buttonContainer} onPress={fetchData} underlayColor="#42911D">
        <Text style={styles.buttonText}>Actualizar Lista</Text>
      </TouchableHighlight>
      
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
            source={{ uri: 'https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg' }}
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
});

export default UsuariosLista;
