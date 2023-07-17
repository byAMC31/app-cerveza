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
import UsuariosDetalles from './src/screens/UsuariosDetalles';
import UsuariosLista from './src/screens/UsuariosLista';
import AdminPrincipal from './src/screens/AdminPrincipal';
import CervezasLista from './src/screens/CervezasLista';
import CervezasDetalles from './src/screens/CervezasDetalles';


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


        <Stack.Screen
          name="UsuariosLista"
          component={UsuariosLista}
          options={{
            title: "Lista de Usuarios",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="UsuariosDetalles"
          component={UsuariosDetalles}
          options={{
            title: "Detalles de usuarios",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

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


      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
