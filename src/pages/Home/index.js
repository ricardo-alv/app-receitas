import { useState } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  SafeAreaView,
  TextInput,TouchableOpacity
 } 
 from 'react-native';

import { Ionicons } from '@expo/vector-icons'
import { Logo } from '../../components/Logo';

export function Home() {
  const [inputValue,setInputValue] = useState("");

  function handleSearch() {
    console.log('Você digitou..',inputValue)
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
          <Ionicons name="search" size={28} color="#4CBE6C"/>
        </TouchableOpacity>
      </View>

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
    backgroundColor:"#FFF",
    width:'100%',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  input: {
    width: '90%',
    height: 54,
    maxWidth: '90%'
  }
})