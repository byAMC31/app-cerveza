import React, { useState } from 'react';
import { Text, StyleSheet, View, ImageBackground, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { getAuth, signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import appFirebase from '../credenciales'; // Import the Firebase app instance
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get the user's role from Firestore
      const db = getFirestore();
      const usersCollection = collection(db, 'usuarios'); // Replace 'usuarios' with the actual collection name
      const q = query(usersCollection, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
  
      let role = 'cliente'; 
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.rol) {
          role = userData.rol;
        } else {
          console.log("Rol de usuario no encontrado. Por defecto a 'cliente'.");
        }
      } else {
        console.log("Rol de usuario no encontrado. Por defecto a 'cliente'.");
      }
  
      // Redirigir al usuario a la pantalla adecuada según su rol
      switch (role) {
        case 'admin':
          props.navigation.navigate('AdminPrincipal');
          break;
        case 'repartidor':
          props.navigation.navigate('HomeRepartidor');
          break;
        case 'cliente':
          props.navigation.navigate('HomeCliente');
          break;
        default:
          props.navigation.navigate('HomeCliente'); 
      }
    }  catch (error) {
      // Traducir los errores específicos de Firebase al español
      switch (error.code) {
        case 'auth/invalid-email':
          Alert.alert('Correo electrónico inválido');
          break;
        case 'auth/wrong-password':
          Alert.alert('Contraseña incorrecta');
          break;
        case 'auth/user-not-found':
          Alert.alert('Usuario no encontrado');
          break;
          case 'auth/missing-password':
            Alert.alert('Ingresa una contraseña, el campo esta vacio');
            break;
        // Agrega más casos según las necesidades
        default:
          Alert.alert('Error de inicio de sesión: ' + error.message);
      }
  
      
    }
    // props.navigation.navigate('HomeCliente');
  };

  return (
    <ImageBackground source={require("../img/bg_login.jpg")} style={styles.backgroundImage}>
      <View style={styles.contenedorPadre}>
        <View style={styles.tarjeta}>
          <View style={styles.contenedor}>
            <Image style={styles.logo} source={require("../img/logo_login.jpg")} />
            <Text style={styles.texto_bienvenido}>Bienvenido a DrinkNet</Text>
            <TextInput
              placeholder='E-mail'
              style={styles.texto_input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder='Password'
              style={styles.texto_input}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.boton} onPress={handleLogin}>
              <Text style={styles.textoBoton}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
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


