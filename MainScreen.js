import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = ({ navigation }) => {
  const [vagas, setVagas] = useState([]);

  const loadVagas = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/vagas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVagas(response.data);
    } catch (error) {
      console.error('Erro ao carregar as vagas:', error);
    }
  };

  useEffect(() => {
    loadVagas();
  }, []);

  return (
    <View>
      <Text>Vagas Disponíveis</Text>
      <FlatList
        data={vagas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>Capacidade: {item.capacidade}</Text>
            <Text>Ocupação Atual: {item.ocupacaoAtual}</Text>
          </View>
        )}
      />
      <Button title="Logout" onPress={() => navigation.replace('Login')} />
    </View>
  );
};

export default MainScreen;
