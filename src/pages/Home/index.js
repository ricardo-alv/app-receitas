import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList
}
  from 'react-native';

import api from '../../services/api';

import { Ionicons } from '@expo/vector-icons'
import Logo from '../../components/Logo';
import FoodList from '../../components/FoodList';


export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [foods, setFoods] = useState([]);

  useEffect(() => {

    async function fetchApi() {
      const response = await api.get('/foods'); 
      setFoods(response.data)
    }

    fetchApi();
  }, []);

  function handleSearch() {
    console.log('Você digitou..', inputValue)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.title}>Enconte a receita</Text>
      <Text style={styles.title}>que combina com você</Text>

      <View style={styles.form}>
        <TextInput
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          placeholder="Digite o nome da comida..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color="#4CBE6C" />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={foods}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FoodList data={item} />
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0E0E0E"
  },
  form: {
    backgroundColor: "#FFF",
    width: '100%',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    width: '90%',
    height: 54,
    maxWidth: '90%'
  }
})