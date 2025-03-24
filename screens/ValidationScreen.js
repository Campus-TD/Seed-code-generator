import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { generarCodigoSincronizado } from './utils';

const ValidationScreen = ({ navigation }) => {
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [verificando, setVerificando] = useState(false);
  
  const validarCodigo = () => {
    if (!codigoIngresado.trim()) {
      Alert.alert("Error", "Debes ingresar el código de acceso");
      return;
    }
    
    setVerificando(true);
    
    try {
      // Obtener el código actual usando la función de utils.js
      const codigoActual = generarCodigoSincronizado();
      
      if (codigoIngresado.toUpperCase() === codigoActual) {
        Alert.alert(
          "Acceso Concedido", 
          "Código validado correctamente",
          [{ text: "Continuar", onPress: () => navigation.navigate('Home') }]
        );
      } else {
        Alert.alert(
          "Código Incorrecto", 
          "El código ingresado no coincide con el código actual. Verifica e intenta de nuevo."
        );
      }
    } catch (error) {
      console.error("Error al validar:", error);
      Alert.alert("Error", "Ocurrió un problema al validar el código");
    }
    
    setVerificando(false);
    setCodigoIngresado(''); // Limpiar el campo después de intentar
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Verificación de Código</Text>
      
      <Text style={styles.instruccion}>
        Ingresa el código de acceso
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Código de acceso"
        value={codigoIngresado}
        onChangeText={setCodigoIngresado}
        autoCapitalize="characters"
        autoCorrect={false}
      />
      
      <Button
        title={verificando ? "Verificando..." : "Validar Código"}
        onPress={validarCodigo}
        disabled={verificando || !codigoIngresado.trim()}
      />
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  instruccion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  infoContainer: {
    backgroundColor: '#e8f4fd',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    marginTop: 20,
  },
  infoTexto: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
  }
});

export default ValidationScreen;