import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, Alert, TouchableHighlight, Image } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import credenciales from '../credenciales';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UsuarioDatos = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [profilePictureURI, setProfilePictureURI] = useState('');
  const defaultProfilePictureURI ='https://firebasestorage.googleapis.com/v0/b/app-cerveza-641f3.appspot.com/o/images%2Fimagen_1689792550856.png?alt=media&token=b2070e6e-9b1a-41df-820f-f18be560db52';

  
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid;

        if (!userId) {
          console.log('No se encontró ningún usuario autenticado.');
          return;
        }

        const db = getFirestore(credenciales.appFirebase);
        const userRef = doc(db, 'usuarios', userId);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          console.log('No se encontró ningún usuario con ese UID.');
          return;
        }

        setUser({ uid: userId, ...userSnapshot.data() });
        setEdad(userSnapshot.data().edad);
        setEmail(userSnapshot.data().email);
        setNombre(userSnapshot.data().nombre);
        setPassword(userSnapshot.data().password);
        setTelefonoCliente(userSnapshot.data().telefono_cliente);
        setProfilePictureURI(userSnapshot.data().img);

      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        fetchUserData();
      }, [auth.currentUser]);
    
  
  const handleActualizar = () => {
    Alert.alert(
      'Actualizar datos',
      '¿Estás seguro/a de que quieres actualizar tus datos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Actualizar', onPress: actualizarDatos }
      ]
    );
  };
  const handleRefresh = () => {
    fetchUserData();
  };
 
  const handleProfilePictureSelection = async () => {
    try {
      const imagePickerResponse = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!imagePickerResponse.cancelled) {
        setProfilePictureURI(imagePickerResponse.uri);
        await uploadImage(imagePickerResponse.uri); 
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
      setProfilePictureURI(downloadURL); 
  
      console.log('Image uploaded successfully:', downloadURL);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };
  

  const actualizarDatos = async () => {
    try {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        console.log('No se encontró ningún usuario autenticado.');
        return;
      }

      const db = getFirestore(credenciales.appFirebase);
      const userRef = doc(db, 'usuarios', userId);

      // Update the user data including the profile picture URI
      await updateDoc(userRef, {
        edad: edad,
        email: email,
        nombre: nombre,
        password: password,
        telefono_cliente: telefonoCliente,
        img: profilePictureURI, // Save the profile picture URI to Firestore
      });

      console.log('Datos actualizados correctamente');
      Toast.show({
        type: 'success',
        text1: 'Actualización exitosa',
        text2: 'Tus datos se han actualizado correctamente.',
      });

    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
       
      {user ? (
        <View style={styles.userDataContainer}>
              
            <TouchableHighlight
            onPress={handleProfilePictureSelection} 
            underlayColor="transparent" 
          >
            <Image
              source={{ uri: profilePictureURI || defaultProfilePictureURI }}
              style={styles.profilePicture}
            />
          </TouchableHighlight>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.emailText}>{user.email}</Text>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput style={styles.input} value={nombre} onChangeText={(text) => setNombre(text)} />
          <Text style={styles.label}>Edad:</Text>
          <TextInput style={styles.input} value={edad} onChangeText={(text) => setEdad(text)} />
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput style={styles.input} value={password} onChangeText={(text) => setPassword(text)} />
          <Text style={styles.label}>Teléfono Cliente:</Text>
          <TextInput style={styles.input} value={telefonoCliente} onChangeText={(text) => setTelefonoCliente(text)} />
          

          <View style={styles.buttonRow}>
          <TouchableHighlight style={styles.buttonContainer} onPress={handleActualizar} underlayColor="#50B91E">
            <Text style={styles.buttonText}>Actualizar Datos</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonContainer2} onPress={handleProfilePictureSelection} underlayColor="#50B91E">
            <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.refreshButtonContainer} onPress={handleRefresh} underlayColor="#2AA08B">
            <Icon name="refresh" size={24} color="white" />
          </TouchableHighlight>
          
        </View>
      ) : (
        <Text>No se encontró ningún usuario autenticado.</Text>
      )}
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15, 
    marginTop: 2,
  },
  userDataContainer: {
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
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#46B114',
    borderColor: '#50B91E',
    borderWidth: 2,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 40,
    marginTop: 2,
    padding: 12,
    alignItems: 'center',
  },
  buttonContainer2: {
    backgroundColor: '#1A68CB',
    borderColor: '#1A68CB',
    borderWidth: 2,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 2,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 16,
    marginBottom: 15,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 1,
    marginBottom: 20,
  },

 
  refreshButtonContainer: {
    backgroundColor: '#31AB96',
    borderColor: '#31AB96',
    borderWidth: 2,
    borderRadius: 40,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', 
    marginTop: 5,
    marginBottom: 5,
 
  },

  
  buttonRow: {
    flexDirection: 'row', // Colocar los botones en fila horizontal
    justifyContent: 'space-around', // Espaciar los botones equitativamente
    marginTop: 1, // Añadir margen superior para separar de la lista
    padding: 10,
  },

 
});

export default UsuarioDatos;
