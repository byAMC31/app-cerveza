import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, Alert, TouchableHighlight,Image, Avatar } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import credenciales from '../credenciales';
import Toast from 'react-native-toast-message';

const BotellasDetalles = ({ navigation, route }) => {
  const [botella, setBotella] = useState(null);
  const [existencia, setExistencia] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');


  useEffect(() => {
    const getBotellaById = async () => {
      try {
        if (!route.params || !route.params.botellaid) {
          return;
        }

        const db = getFirestore(credenciales.appFirebase);
        const botellasRef = doc(db, 'botellas', route.params.botellaid);
        const botellaSnapshot = await getDoc(botellasRef);

        if (!botellaSnapshot.exists()) {
          console.log('No se encontró ninguna botella con ese ID.');
          return;
        }

        setBotella({ id: botellaSnapshot.id, ...botellaSnapshot.data() });
        setExistencia(botellaSnapshot.data().existencia);
        setNombre(botellaSnapshot.data().nombre);
        setPrecio(botellaSnapshot.data().precio);

    } catch (error) {
        console.log(error);
      }
    };

    getBotellaById();
  }, [route.params?.botellasid]);

  const handleActualizar = () => {
    Alert.alert(
      'Actualizar botella',
      '¿Estás seguro/a de que quieres actualizar la botella?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Actualizar', onPress: actualizarBotella }
      ]
    );
  };

  const handleEliminar = () => {
    Alert.alert(
      'Eliminar botella',
      '¿Estás seguro/a de que quieres eliminar la botella?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: eliminarBotella, style: 'destructive' }
      ]
    );
  };

  const actualizarBotella = async () => {
    try {
      const db = getFirestore(credenciales.appFirebase);
      const botellaRef = doc(db, 'botellas', botella.id);

      await updateDoc(botellaRef, {
        existencia: existencia,
        nombre: nombre,
        precio: precio,
    });

      console.log('Botella actualizada correctamente');
      Toast.show({
        type: 'success',
        text1: 'Actualización exitosa',
        text2: 'La botella se ha actualizado correctamente.',
      });

      navigation.navigate('BotellasDetalles', { refresh: true });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarBotella = async () => {
    try {
      const db = getFirestore(credenciales.appFirebase);
      const botellaRef = doc(db, 'botellas', botella.id);

      await deleteDoc(botellaRef);

      console.log('Botella eliminada correctamente');
      navigation.navigate('BotellasLista');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {botella ? (
        <View style={styles.botellaContainer}>
            <Image
            source={{ uri: botella.img }} 
            style={styles.imagenBotella} 
          />
          <Text style={styles.label}>Nombre:</Text>
          <TextInput style={styles.input} value={nombre} onChangeText={(text) => setNombre(text)} />
          <Text style={styles.label}>Precio:</Text>
          <TextInput style={styles.input} value={precio} onChangeText={(text) => setPrecio(text)} />
          <Text style={styles.label}>Existencias:</Text>
          <TextInput style={styles.input} value={existencia.toString()} onChangeText={(text) => setExistencia(text)} />
          
          <TouchableHighlight style={styles.buttonContainer} onPress={handleActualizar} underlayColor="#50B91E">
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonContainerEliminar} onPress={handleEliminar} underlayColor="#B0260B">
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <Text>No se encontró ninguna botella con ese ID.</Text>
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
  botellaContainer: {
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
  imagenBotella: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center', // Centrar horizontalmente
    justifyContent: 'center', // Centrar verticalmente
  },

});

export default BotellasDetalles;
