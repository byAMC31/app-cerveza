import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../credenciales.js';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

import 'expo-dev-client';

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';



export default function SignUp(props) {
  // Variables para capturar los datos
  const initialState = {
    nombre: '',
    email: '',
    password: '',
    edad: ''
  }

  const [estado, setEstado] = useState(initialState);

  // Funcion para que no se sobrescriba
  const handleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  }

  // Función para crear un nuevo usuario en Firebase Authentication
  const signUpUser = async () => {
    try {
      if (estado.edad === '' || estado.email === '' || estado.nombre === '' || estado.password === '') {
        Alert.alert('Mensaje importante', 'Debes rellenar los campos requeridos');
      } else {
        const usuario = {
          nombre: estado.nombre,
          email: estado.email,
          password: estado.password,
          edad: estado.edad,
          rol: 'cliente',
        };

        // Crear el usuario en Firebase Authentication
        const auth = getAuth();
        const { user } = await createUserWithEmailAndPassword(auth, estado.email, estado.password);

        // Utiliza setDoc para agregar el usuario con el UID como ID del documento en Firestore
        await setDoc(doc(db, 'usuarios', user.uid), usuario);

        Alert.alert('Registro exitoso', '¡Usuario registrado con éxito!');
        props.navigation.navigate('Principal');
      }
    } catch (error) {

      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('Correo electrónico inválido');
          break;
        case 'auth/weak-password':
          Alert.alert('La contraseña debe de tener minimo 6 caracteres');
          break;

        default:
          Alert.alert('Error', 'Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.');
          console.log(error)

      }


    }
  }

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  GoogleSignin.configure({
    webClientId: '34648858927-isqqeqrkpgngcsoouvmnepvn574uga8q.apps.googleusercontent.com',
  });
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);


    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in.then((user) => {
      console.log(user);
    }).catch((error) => {
      console.log(error);
    })
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.error(error)
    }
  }
// Podemos pasar a la otra vista
  return (
    <ImageBackground source={require("../img/bg_login.jpg")} style={styles.backgroundImage}>
      <View style={styles.contenedorPadre}>
        <View style={styles.tarjeta}>
          <View style={styles.contenedor}>
            <Image style={styles.logo} source={require("../img/logo_login.jpg")} />
            <Text style={styles.texto_bienvenido}>Bienvenido a DrinkNet</Text>
            <TextInput placeholder='Nombre' style={styles.texto_input} value={estado.nombre} onChangeText={(value) => handleChangeText(value, 'nombre')} />
            <TextInput placeholder='E-mail' style={styles.texto_input} value={estado.email} onChangeText={(value) => handleChangeText(value, 'email')} />
            <TextInput placeholder='Password' style={styles.texto_input} secureTextEntry={true} value={estado.password} onChangeText={(value) => handleChangeText(value, 'password')} />
            <TextInput placeholder='Edad' style={styles.texto_input} value={estado.edad} onChangeText={(value) => handleChangeText(value, 'edad')} />

            <TouchableOpacity style={styles.boton} onPress={signUpUser} >
              <Text style={styles.textoBoton}>Sign Up</Text>
            </TouchableOpacity>
            
            <GoogleSigninButton style={{ width: 250, height: 50, marginTop: 20 }}
              onPress={onGoogleButtonPress}
            />

          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Ajusta la imagen al tamaño del contenedor
  },
  contenedorPadre: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tarjeta: {
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
  },
  contenedor: {
    padding: 20
  },
  logo: {
    width: 213,
    height: 120,
    marginBottom: 20,
    marginLeft: 18,
  },
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
  texto_input: {
    borderColor: "slategray",
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8
  },
  texto_bienvenido: {
    fontSize: 19,
    fontWeight: "bold",
    marginLeft: 26,
    marginBottom: 5
  }
});
