import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableHighlight, StyleSheet,Image } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import credenciales from '../credenciales';
import { ListItem, Avatar } from 'react-native-elements';
import Toast from 'react-native-toast-message';

const AdminPrincipal = ({ navigation }) => {
  
  return (
    <ScrollView>
       <View style={styles.container}>
                        <Image style={styles.logo} source={require("../img/logo_principal2.png")} />
                        </View>
      <ListItem
          bottomDivider
          onPress={() => {
            navigation.navigate('CervezasLista', {
            });
          }}
        >
        <ListItem.Chevron />
        <Avatar
          rounded
          source={{ uri: 'https://m.media-amazon.com/images/I/71AA29nFw3L._AC_SX679_.jpg' }}
        />
        <ListItem.Content>
          <ListItem.Title>Cervezas</ListItem.Title>
          <ListItem.Subtitle>Administra el inventario de cervezas</ListItem.Subtitle>     
        </ListItem.Content>
      </ListItem>


      <ListItem
          bottomDivider
          onPress={() => {
            navigation.navigate('BotellasLista', {
            });
          }}
        >
        <ListItem.Chevron />
        <Avatar
          rounded
          source={{ uri: 'https://www.faragulla.com/wp-content/uploads/La-10-botellas-con-las-que-empezar-tu-bar-en-casa-por-Faragulla-02.jpg' }}
        />
        <ListItem.Content>
          <ListItem.Title>Botellas</ListItem.Title>
          <ListItem.Subtitle>Administra el inventario de botellas</ListItem.Subtitle>     
        </ListItem.Content>
      </ListItem>


      <ListItem
          bottomDivider
          onPress={() => {
            navigation.navigate('UsuariosLista', {
            });
          }}
        >
        <ListItem.Chevron />
        <Avatar
          rounded
          source={{ uri: 'https://cdn.icon-icons.com/icons2/212/PNG/256/Users256_25013.png' }}
        />
        <ListItem.Content>
          <ListItem.Title>Usuarios</ListItem.Title>
          <ListItem.Subtitle>Gestiona los usuarios registrados</ListItem.Subtitle>     
        </ListItem.Content>
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    width: 213,
    height: 120,
    marginBottom: 2,
    marginTop:5
  },
  container: {
    flex: 1, // Take the entire available space
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,

  },
});

export default AdminPrincipal;
