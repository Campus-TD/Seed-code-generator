import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  
  const [codigo, setCodigo] = useState('');

  const handlePress = () => {
    if(Number(codigo) === 1234){
      alert("Codigo correcto");
    } else {
      alert("Codigo incorrecto");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Aqui escribe tu codigo de acceso</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Dame el codigo"
        keyboardType="numeric"
        value={codigo}
        onChangeText={setCodigo}
      />
      
      <Button title="Ingresar" onPress={handlePress}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 15,
  },
});
