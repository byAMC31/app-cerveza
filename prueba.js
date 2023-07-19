import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';

export default function Principal() {
  return (
    <ImageBackground source={require('./ruta/de/la/imagen.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Boton de iniciar sesion */}
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.textoBoton}>Log In</Text>
        </TouchableOpacity>

        {/* Boton de crear usuario */}
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.textoBoton}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ajusta la imagen al tamaño del contenedor
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Color de fondo con transparencia
    justifyContent: 'center',
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#B71375',
    borderColor: '#FC4F00',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoBoton: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});
