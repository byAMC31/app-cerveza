import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

export default function Principal(props) {
  return (
    <ImageBackground source={require("../img/bg_login.jpg")} style={styles.backgroundImage}>
      {/* Contenedor general */}
      <View style={styles.container}>
        
        {/* Contenedor del logo*/}
        <View style={styles.container_logo}>
          <Image
            style={styles.logo}
            source={require("../img/logo_principal2.png")}
          />
        </View>

        {/* Contenedor de botones */}
        <View style={styles.container_botones}>
          <View style={styles.container_btn_login}>
            {/* Boton de iniciar sesion */}
            <TouchableOpacity style={styles.boton} onPress={()=>props.navigation.navigate('HomeRepartidor')}>
              <Text style={styles.textoBoton}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container_btn_signin}>
            {/* Boton de crear usuario */}
            <TouchableOpacity style={styles.boton} onPress={()=>props.navigation.navigate('SignUp')}>
              <Text style={styles.textoBoton}>Sig Up</Text>
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
    resizeMode: "cover", // Ajusta la imagen al tamaño del contenedor
  },
  // Contenedor principal
  container: {
    flex: 1,
  },
  // Contenedor de imagen
  container_logo: {
    flex: 1,
    alignItems: "center"
  },
  logo: {
    width: 260,
    height: 170,
    marginTop:200
  },
  // Contenedor de botones
  container_botones: {
    flex: 1,
    flexDirection:"row"
    
  },
  container_btn_login: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  container_btn_signin: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
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
});
