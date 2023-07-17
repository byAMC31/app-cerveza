import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import credenciales from '../credenciales';
import { ListItem, Avatar } from 'react-native-elements';
import Toast from 'react-native-toast-message';

const AdminPrincipal = ({ navigation }) => {
  
  return (
    <ScrollView>
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
          source={{ uri: 'https://www.opportimes.com/wp-content/uploads/2022/02/cerveza-Constellations-Brands.png' }}
        />
        <ListItem.Content>
          <ListItem.Title>Cervezas</ListItem.Title>
          <ListItem.Subtitle>Administra el inventario de cervezas</ListItem.Subtitle>     
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
});

export default AdminPrincipal;
