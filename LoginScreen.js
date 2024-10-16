import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Erro de Login', 'Credenciais inválidas.');
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Registrar" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;
