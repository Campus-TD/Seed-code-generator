import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default function CodeScreen({ navigation }) {
  const [codigo, setCodigo] = useState('');
  const [codigoEncriptado, setCodigoEncriptado] = useState('');
  const [horaGeneracion, setHoraGeneracion] = useState(null);  // Para guardar la hora de generación del código

  const validarCodigo = () => {
    if (codigoEncriptado === codigo) {
      navigation.navigate('Home');
    } else {
      alert('Código incorrecto');
    }
  };

  const convertirANumeroALetra = (numero) => {
    const letras = 'ABCDEFGHIJ';

    if (numero === undefined) return 'X';

    const indice = parseInt(numero, 10);
    if (isNaN(indice) || indice < 0 || indice >= letras.length) return 'X';

    const letra = letras[indice];
    return Math.random() > 0.5 ? letra.toUpperCase() : letra.toLowerCase();
  };

  const generarCodigo = () => {
    const ahora = new Date();
    
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    const milisegundos = ahora.getMilliseconds().toString();
    
    // Si el código ya fue generado y no ha pasado más de 10 segundos, no generamos uno nuevo
    if (horaGeneracion && (ahora - horaGeneracion) < 10000) {
      console.log("El código aún es válido: " + codigoEncriptado);
      return; // Sale de la función si el código aún es válido
    }

    // Si pasó más de 10 segundos, generamos un nuevo código
    const codigoGenerado = (
      convertirANumeroALetra(minutos[0]) +
      convertirANumeroALetra(minutos[1]) +
      convertirANumeroALetra(segundos[0]) +
      convertirANumeroALetra(segundos[1]) +
      convertirANumeroALetra(milisegundos[0])
    );

    setCodigoEncriptado(codigoGenerado);
    setHoraGeneracion(new Date()); // Guardamos la hora de generación
    console.log("El código generado es: " + codigoGenerado);
  };

  return (
    <View style={styles.container}>
      <Text>Aqui escribe tu codigo de acceso</Text>
      <TextInput
        style={styles.input}
        placeholder="Dame el codigo"
        value={codigo}
        onChangeText={setCodigo}
      />
      <Button title="Ingresar" onPress={validarCodigo} />
      <Button title="Generar Codigo" onPress={generarCodigo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 15,
  }
});
