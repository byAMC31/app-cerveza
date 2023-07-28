
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
 import { GoogleSignin } from '@react-native-google-signin/google-signin';
const Drawer = createDrawerNavigator();
import auth from '@react-native-firebase/auth';
// import { getAuth, signOut } from '@react-native-firebase/auth';
export default function HomeCliente(props) {

    // // 2. Usa getAuth() para obtener la instancia de autenticación
    // const auth = getAuth();
    // // 3. Recuperar la ID del usuario actualmente autenticado
    // const userId = auth.currentUser?.uid;

    const cerrarSesion = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
            props.navigation.navigate('Principal');
          } catch (error) {
            console.error(error)
          }
      };

    return (
        <ScrollView>
            <View style={styles.contenedorPadre}>

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
            <TouchableOpacity style={styles.boton} onPress={cerrarSesion}>
                <Text style={styles.textoBoton}>Cerrar sesion</Text>
            </TouchableOpacity>

        </ScrollView>


    );
}

const styles = StyleSheet.create({
    contenedorPadre: {
        flex: 1,
        marginRight: 8
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
        flexDirection: 'row',
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
    boton_pedido: {
        backgroundColor: "#e40f0f",
        borderColor: "#e40f0f",
        borderWidth: 2,
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 210,
        marginTop: 15,
    },
    icono: {
        padding: 8,
    },
    texto_bienvenida: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20
    },
    texto_categoria: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

