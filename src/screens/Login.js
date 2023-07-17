import React, { useState } from 'react';
import { Text, StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'admin@gmail.com' && password === '123456') {
      props.navigation.navigate('AdminPrincipal');
    } else {
      props.navigation.navigate('HomeCliente');
    }
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


