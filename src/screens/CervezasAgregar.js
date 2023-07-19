import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableHighlight, Image } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import credenciales from '../credenciales';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';

const CervezasAgregar = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [img, setImg] = useState(null);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to select an image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const selectedAsset = result.assets[0];
        setImg(selectedAsset.uri);
        await uploadImage(selectedAsset.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const timestamp = Date.now();
      const storage = getStorage(credenciales.appFirebase);
      const imageRef = ref(storage, `images/imagen_${timestamp}.png`);

      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);
      setImg(downloadURL);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  const handleRegistrar = () => {
    Alert.alert(
      'Registrar cerveza',
      '¿Estás seguro/a de que quieres registrar la cerveza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Registrar', onPress: registrarCerveza }
      ]
    );
  };

  const registrarCerveza = async () => {
    try {
      const db = getFirestore(credenciales.appFirebase);
      const cervezasRef = collection(db, 'cervezas');

      await addDoc(cervezasRef, {
        nombre: nombre,
        precio: precio,
        img: img,
      });

      console.log('Cerveza registrada correctamente');
      Toast.show({
        type: 'success',
        text1: 'Registro exitoso',
        text2: 'La cerveza se ha registrado correctamente.',
      });

      navigation.navigate('CervezasLista', { refresh: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={(text) => setNombre(text)} />
      <Text style={styles.label}>Precio:</Text>
      <TextInput style={styles.input} value={precio} onChangeText={(text) => setPrecio(text)} />

      <Text style={styles.label}>Imagen:</Text>
      <TouchableHighlight style={styles.buttonContainer2} onPress={pickImage} underlayColor="#50B91E">
        <Text style={styles.buttonText}>Seleccionar imagen</Text>
      </TouchableHighlight>
      {img && <Image source={{ uri: img }} style={styles.previewImage} />}

      <TouchableHighlight style={styles.buttonContainer} onPress={handleRegistrar} underlayColor="#50B91E">
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableHighlight>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  }, buttonContainer2: {
    backgroundColor: '#1EA3CE',
    borderColor: '#1EA3CE',
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
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },
});

export default CervezasAgregar;
