import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome";

export default function Login(props) {
    return (
        <ScrollView>
            <View style={styles.contenedorPadre}>

                <View style={styles.icono_contenedor}>
                    
                    <TouchableOpacity style={styles.boton_carrito} onPress={() => props.navigation.navigate('Carrito')}>
                        <Icon
                            style={styles.icono}
                            name="shopping-cart"
                            size={30}
                            color="white"
                        />
                    </TouchableOpacity>

                </View>


                <Text style={styles.texto_bienvenida}>¡Seleccione el tipo de bebida!</Text>

                <View style={styles.tarjeta}>
                    <View style={styles.contenedor}>
                        <Image style={styles.img} source={require("../img/cervezas.jpg")} />
                        <Text style={styles.texto_categoria}>Cervezas</Text>
                        <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('ProductosCervezas')}>
                            <Text style={styles.textoBoton}>Comprar</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.tarjeta}>
                    <View style={styles.contenedor}>

                        <Image style={styles.img} source={require("../img/botellas.png")} />
                        <Text style={styles.texto_categoria}>Botellas</Text>

                        <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('ProductosBotellas')}>
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
        marginRight:8
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
    img: {
        width: 213,
        height: 165,
        marginBottom: 20,
        marginLeft: 18,
    },
    icono_contenedor: {
        flexDirection:'row',
        flex: 1,
        justifyContent: "flex-end", // Alineación vertical al centro
        alignItems: "flex-end", // Alineación horizontal al centro
        marginRight: 15, // Espacio adicional si es necesario
        // backgroundColor: "black", 
    },
    boton_carrito: {
        backgroundColor: "#e40f0f",
        borderColor: "#e40f0f",
        borderWidth: 2,
        borderRadius: 15,
        marginLeft: 10,
        marginTop: 15,
    },
    icono: {
        padding: 8,
    },
    texto_bienvenida:{
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    texto_categoria:{
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

