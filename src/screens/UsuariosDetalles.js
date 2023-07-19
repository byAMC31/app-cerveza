import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, Alert, TouchableHighlight } from 'react-native';
import { getFirestore, collection, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, deleteUser as deleteAuthUser } from 'firebase/auth';
import credenciales from '../credenciales';
import Toast from 'react-native-toast-message';

const UsuariosDetalles = ({ navigation, route }) => {
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const getUserByEmail = async () => {
      try {
        if (!route.params || !route.params.useremail) {
          return;
        }

        const db = getFirestore(credenciales.appFirebase);
        const usuariosRef = collection(db, 'usuarios');
        const q = query(usuariosRef, where('email', '==', route.params.useremail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 0) {
          console.log('No se encontró ningún usuario con ese email.');
          return;
        }

        querySnapshot.forEach((doc) => {
          setUsuario({ id: doc.id, ...doc.data() });
          setNombre(doc.data().nombre);
          setEdad(doc.data().edad);
          setEmail(doc.data().email);
          setPassword(doc.data().password);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUserByEmail();
  }, [route.params?.useremail]);

  const handleActualizar = () => {
    Alert.alert(
      'Actualizar usuario',
      '¿Estás seguro/a de que quieres actualizar el usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Actualizar', onPress: actualizarUsuario }
      ]
    );
  };

  const handleEliminar = () => {
    Alert.alert(
      'Eliminar usuario',
      '¿Estás seguro/a de que quieres eliminar el usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: eliminarUsuario, style: 'destructive' }
      ]
    );
  };

  const actualizarUsuario = async () => {
    try {
      const db = getFirestore(credenciales.appFirebase);
      const usuarioRef = doc(db, 'usuarios', usuario.id);

      await updateDoc(usuarioRef, {
        nombre: nombre,
        edad: edad,
        email: email,
        password: password,
      });

      console.log('Usuario actualizado correctamente');
      Toast.show({
        type: 'success',
        text1: 'Actualización exitosa',
        text2: 'El usuario se ha actualizado correctamente.',
      });

      navigation.navigate('UsuariosDetalles', { refresh: true });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarUsuario = async () => {
    try {
      const db = getFirestore(credenciales.appFirebase);
  
      // Buscar el usuario por su email
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.size === 0) {
        console.log('No se encontró ningún usuario con ese email.');
        return;
      }
  
      // Obtener el UID del usuario
      const uid = querySnapshot.docs[0].data().uid;
  
      // Eliminar el usuario de la base de datos Firestore
      const usuarioId = querySnapshot.docs[0].id;
      const usuarioRef = doc(db, 'usuarios', usuarioId);
      await deleteDoc(usuarioRef);
  
      // Eliminar el usuario de Firebase Authentication
      const auth = getAuth();
      await deleteAuthUser(auth, uid);
  
      console.log('Usuario eliminado correctamente');
      navigation.navigate('UsuariosLista');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {usuario ? (
        <View style={styles.usuarioContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput style={styles.input} value={nombre} onChangeText={(text) => setNombre(text)} />
          <Text style={styles.label}>Edad:</Text>
          <TextInput style={styles.input} value={edad} onChangeText={(text) => setEdad(text)} />
          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
          <Text style={styles.label}>Password:</Text>
          <TextInput style={styles.input} value={password} onChangeText={(text) => setPassword(text)}/>
          
          <TouchableHighlight style={styles.buttonContainer} onPress={handleActualizar} underlayColor="#50B91E">
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableHighlight>
      
    
     <TouchableHighlight style={styles.buttonContainerEliminar} onPress={handleEliminar} underlayColor="#B0260B">
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableHighlight>
      
        
        
        </View>
      ) : (
        <Text>No se encontró ningún usuario con ese email.</Text>
      )}
{/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
<Toast />
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  usuarioContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    backgroundColor: '#46B114',
    borderColor: '#50B91E',
    borderWidth: 2,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainerEliminar: {
    backgroundColor: '#EE4218',
    borderColor: '#EE4218',
    borderWidth: 2,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UsuariosDetalles;
