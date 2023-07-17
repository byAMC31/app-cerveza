import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function ProductosBotellas(props) {
    return (
        <ScrollView>
            <View style={styles.contenedorPadre}>
                <View style={styles.tarjeta}>
                    <View style={styles.contenedor}>
                        <Image style={styles.logo} source={require("../img/logo_login.jpg")} />
                        <Text style={styles.texto_bienvenido}>Botellas</Text>
                        <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('HomeCliente')}>
                            <Text style={styles.textoBoton}>Comprar</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.tarjeta}>
                    <View style={styles.contenedor}>

                        <Image style={styles.logo} source={require("../img/logo_login.jpg")} />
                        <Text style={styles.texto_bienvenido}>Botellas</Text>

                        <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('HomeCliente')}>
                            <Text style={styles.textoBoton}>Comprar</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.tarjeta}>
                    <View style={styles.contenedor}>

                        <Image style={styles.logo} source={require("../img/logo_login.jpg")} />
                        <Text style={styles.texto_bienvenido}>Botellas</Text>

                        <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('HomeCliente')}>
                            <Text style={styles.textoBoton}>Comprar</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </ScrollView>


    );
}

const styles = StyleSheet.create({
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
    logo: {
        width: 213,
        height: 120,
        marginBottom:20,
        marginLeft:18,
      },

});