import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Principal from './src/screens/Principal';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import HomeCliente from './src/screens/HomeCliente';
import ProductosCervezas from './src/screens/ProductosCervezas';
import ProductosBotellas from './src/screens/ProductosBotellas';
<<<<<<< HEAD
import ProductoCerveza from './src/screens/ProductoCerveza';
import Carrito from './src/screens/Carrito';
=======
import UsuariosDetalles from './src/screens/UsuariosDetalles';
import UsuariosLista from './src/screens/UsuariosLista';
import AdminPrincipal from './src/screens/AdminPrincipal';
import CervezasLista from './src/screens/CervezasLista';
import CervezasDetalles from './src/screens/CervezasDetalles';


>>>>>>> c4fbb8bb7b89d8a215ce876942551ba5571f3d83
export default function App() {
  const Stack = createStackNavigator();
  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Principal"
          component={Principal}
          options={{
            title: "Principal",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: "SignUp",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="HomeCliente"
          component={HomeCliente}
          options={{
            title: "Home",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="ProductosCervezas"
          component={ProductosCervezas}
          options={{
            title: "Cervezas",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="ProductosBotellas"
          component={ProductosBotellas}
          options={{
            title: "Botellas",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />
<<<<<<< HEAD
        <Stack.Screen
          name="ProductoCerveza"
          component={ProductoCerveza}
          options={{
            title: "Comprar cerveza",
=======


        <Stack.Screen
          name="UsuariosLista"
          component={UsuariosLista}
          options={{
            title: "Lista de Usuarios",
>>>>>>> c4fbb8bb7b89d8a215ce876942551ba5571f3d83
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
<<<<<<< HEAD
          name="Carrito"
          component={Carrito}
          options={{
            title: "Carrito",
=======
          name="UsuariosDetalles"
          component={UsuariosDetalles}
          options={{
            title: "Detalles de usuarios",
>>>>>>> c4fbb8bb7b89d8a215ce876942551ba5571f3d83
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />
<<<<<<< HEAD
=======

      <Stack.Screen
          name="AdminPrincipal"
          component={AdminPrincipal}
          options={{
            title: "Admistrador",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

      <Stack.Screen
          name="CervezasLista"
          component={CervezasLista}
          options={{
            title: "Lista de cervezas",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="CervezasDetalles"
          component={CervezasDetalles}
          options={{
            title: "Detalles de cerveza",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />


>>>>>>> c4fbb8bb7b89d8a215ce876942551ba5571f3d83
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
