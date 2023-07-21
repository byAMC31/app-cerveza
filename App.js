import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Principal from './src/screens/Principal';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import HomeCliente from './src/screens/HomeCliente';
import ProductosCervezas from './src/screens/ProductosCervezas';
import ProductosBotellas from './src/screens/ProductosBotellas';
import ProductoCerveza from './src/screens/ProductoCerveza';
import Carrito from './src/screens/Carrito';
import UsuariosDetalles from './src/screens/UsuariosDetalles';
import UsuariosLista from './src/screens/UsuariosLista';
import AdminPrincipal from './src/screens/AdminPrincipal';
import CervezasLista from './src/screens/CervezasLista';
import CervezasDetalles from './src/screens/CervezasDetalles';
import CervezasAgregar from './src/screens/CervezasAgregar';
import ProductoBotella from './src/screens/ProductoBotella';
import BotellasLista from './src/screens/BotellasLista';
import BotellasDetalles from './src/screens/BotellasDetalles';
import BotellasAgregar from './src/screens/BotellasAgregar';
import HomeRepartidor from './src/screens/HomeRepartidor';
import MapaPedido from './src/screens/MapaPedido';
import PedidosCliente from './src/screens/PedidosCliente';
import PedidosActivoRepartidor from './src/screens/PedidosActivosRepartidor'; 
import PedidosRealizadosRepartidor from './src/screens/PedidosRealizadosRepartidor'; 
import RepartidoresLista from './src/screens/RepartidoresLista';
import RepartidoresAgregar from './src/screens/RepartidoresAgregar';


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
          name="ProductoCerveza"
          component={ProductoCerveza}
          options={{
            title: "Cerveza",
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
          name="Carrito"
          component={Carrito}
          options={{
            title: "Carrito",
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

        <Stack.Screen
          name="CervezasAgregar"
          component={CervezasAgregar}
          options={{
            title: "Agregar una cerveza",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="UsuariosDetalles"
          component={UsuariosDetalles}
          options={{
            title: "Detalles del Usuarios",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="ProductoBotella"
          component={ProductoBotella}
          options={{
            title: "Detalles de botella",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="BotellasLista"
          component={BotellasLista}
          options={{
            title: "Lista de botellas",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="BotellasDetalles"
          component={BotellasDetalles}
          options={{
            title: "Detalles de botella",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="BotellasAgregar"
          component={BotellasAgregar}
          options={{
            title: "Agregar una Botella",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="HomeRepartidor"
          component={HomeRepartidor}
          options={{
            title: "Repartidor",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="MapaPedido"
          component={MapaPedido}
          options={{
            title: "Mapa pedido",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="RepartidoresLista"
          component={RepartidoresLista}
          options={{
            title: "Lista de repartidores",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="RepartidoresAgregar"
          component={RepartidoresAgregar}
          options={{
            title: "Agregar un repartidor",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

        <Stack.Screen
          name="PedidosCliente"
          component={PedidosCliente}
          options={{
            title: "Pedidos realizados",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />

<Stack.Screen
          name="PedidosActivosRepartidor"
          component={PedidosActivoRepartidor}
          options={{
            title: "Pedidos activos",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#e40f0f" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="PedidosRealizadosRepartidor"
          component={PedidosRealizadosRepartidor}
          options={{
            title: "Pedidos realizados",
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
