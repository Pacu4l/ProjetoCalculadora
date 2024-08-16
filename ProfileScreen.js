// ProfileScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);

  const handleEdit = () => {
    // Lógica para editar perfil (navegar para outra tela, abrir um modal, etc.)
    Alert.alert("Edit Profile", "Here you can implement the edit profile functionality.");
  };

  const handleDeleteAccount = async () => {
    try {
      await auth().currentUser.delete();
      Alert.alert("Account Deleted", "Your account has been deleted.");
    } catch (error) {
      Alert.alert("Error", "An error occurred while deleting your account.");
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.photoURL || 'https://via.placeholder.com/150' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.displayName || 'User Name'}</Text>
      <Text style={styles.description}>
        {user.email || 'This is a brief description of the user.'}
      </Text>
      <Button title="Edit Profile" onPress={handleEdit} />
      <Button title="Delete Account" color="red" onPress={handleDeleteAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ProfileScreen;
