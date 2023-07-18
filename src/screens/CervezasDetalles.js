import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, Alert, TouchableHighlight,Image, Avatar } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import credenciales from '../credenciales';
import Toast from 'react-native-toast-message';

const CervezasDetalles = ({ navigation, route }) => {
  const [cerveza, setCerveza] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  

  useEffect(() => {
    const getCervezaById = async () => {
      try {
        if (!route.params || !route.params.cervezaid) {
          return;
        }

        const db = getFirestore(credenciales.appFirebase);
        const cervezasRef = doc(db, 'cervezas', route.params.cervezaid);
        const cervezaSnapshot = await getDoc(cervezasRef);

        if (!cervezaSnapshot.exists()) {
          console.log('No se encontró ninguna cerveza con ese ID.');
          return;
        }

        setCerveza({ id: cervezaSnapshot.id, ...cervezaSnapshot.data() });
        setNombre(cervezaSnapshot.data().nombre);
        setPrecio(cervezaSnapshot.data().precio);

    } catch (error) {
        console.log(error);
      }
    };

    getCervezaById();
  }, [route.params?.cervezaid]);

  const handleActualizar = () => {
    Alert.alert(
      'Actualizar cerveza',
      '¿Estás seguro/a de que quieres actualizar la cerveza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Actualizar', onPress: actualizarCerveza }
      ]
    );
  };

  const handleEliminar = () => {
    Alert.alert(
      'Eliminar cerveza',
      '¿Estás seguro/a de que quieres eliminar la cerveza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: eliminarCerveza, style: 'destructive' }
      ]
    );
  };

  const actualizarCerveza = async () => {
    try {
      const db = getFirestore(credenciales.appFirebase);
      const cervezaRef = doc(db, 'cervezas', cerveza.id);

      await updateDoc(cervezaRef, {
       
        nombre: nombre,
        precio: precio,

    });

      console.log('Cerveza actualizada correctamente');
      Toast.show({
        type: 'success',
        text1: 'Actualización exitosa',
        text2: 'La cerveza se ha actualizado correctamente.',
      });

      navigation.navigate('CervezasDetalles', { refresh: true });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarCerveza = async () => {
    try {
      const db = getFirestore(credenciales.appFirebase);
      const cervezaRef = doc(db, 'cervezas', cerveza.id);

      await deleteDoc(cervezaRef);

      console.log('Cerveza eliminada correctamente');
      navigation.navigate('CervezasLista');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cerveza ? (
        <View style={styles.cervezaContainer}>
            <Image
            source={{ uri: cerveza.img }} 
            style={styles.imagenCerveza} 
          />
          <Text style={styles.label}>Nombre:</Text>
          <TextInput style={styles.input} value={nombre} onChangeText={(text) => setNombre(text)} />
          <Text style={styles.label}>Precio:</Text>
          <TextInput style={styles.input} value={precio} onChangeText={(text) => setPrecio(text)} />
          
          <TouchableHighlight style={styles.buttonContainer} onPress={handleActualizar} underlayColor="#50B91E">
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonContainerEliminar} onPress={handleEliminar} underlayColor="#B0260B">
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <Text>No se encontró ninguna cerveza con ese ID.</Text>
      )}
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  cervezaContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
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
  buttonContainerEliminar: {
    backgroundColor: '#EE4218',
    borderColor: '#EE4218',
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
  imagenCerveza: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center', // Centrar horizontalmente
    justifyContent: 'center', // Centrar verticalmente
  },

});

export default CervezasDetalles;
