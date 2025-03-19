import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Animated } from 'react-native';

export default function CodeScreen({ navigation }) {
  const [codigo, setCodigo] = useState('');
  const [codigoEncriptado, setCodigoEncriptado] = useState('');
  const [horaGeneracion, setHoraGeneracion] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState(0); // Tiempo restante en segundos
  const [anchoBarra] = useState(new Animated.Value(0)); // Valor para animación de la barra
  const [codigoExpirado, setCodigoExpirado] = useState(false); // Nuevo estado para controlar si el código ha expirado

  useEffect(() => {
    let intervalo = null;
    
    if (horaGeneracion) {
      setCodigoExpirado(false); // Reiniciamos el estado de expiración
      
      // Configurar la animación para la barra de progreso
      Animated.timing(anchoBarra, {
        toValue: 100,
        duration: 60000, // 60 segundos (1 minuto) en lugar de 10000
        useNativeDriver: false,
      }).start();
      
      intervalo = setInterval(() => {
        const tiempoTranscurrido = new Date() - horaGeneracion;
        const segundosRestantes = Math.max(0, 60 - Math.floor(tiempoTranscurrido / 1000));
        
        setTiempoRestante(segundosRestantes);
        
        // Si ya no queda tiempo, limpiar el intervalo y marcar como expirado
        if (segundosRestantes === 0) {
          clearInterval(intervalo);
          setCodigoExpirado(true);
          setCodigo(''); // Limpiar el campo de entrada
        }
      }, 1000);
    }
    
    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      if (intervalo) clearInterval(intervalo);
      anchoBarra.setValue(0); // Reiniciar la barra
    };
  }, [horaGeneracion]);

  // Calcular el color dependiendo del tiempo restante
  const obtenerColorTiempo = () => {
    if (tiempoRestante > 7) return '#27ae60'; // Verde
    if (tiempoRestante > 3) return '#f39c12'; // Amarillo/naranja
    return '#e74c3c'; // Rojo para últimos segundos
  };

  const validarCodigo = () => {
    // No permitir validar si el código está expirado
    if (codigoExpirado) {
      alert('El código ha expirado. Por favor genere uno nuevo.');
      return;
    }
    
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
    
    // Si el código ya fue generado y no ha pasado más de 60 segundos, no generamos uno nuevo
    if (horaGeneracion && (ahora - horaGeneracion) < 60000) {
      alert(`El código aún es válido: ${codigoEncriptado}\nTiempo restante: ${tiempoRestante} segundos`);
      return; // Sale de la función si el código aún es válido
    }

    // Si pasó más de 60 segundos, generamos un nuevo código
    const codigoGenerado = (
      convertirANumeroALetra(minutos[0]) +
      convertirANumeroALetra(minutos[1]) +
      convertirANumeroALetra(segundos[0]) +
      convertirANumeroALetra(segundos[1]) +
      convertirANumeroALetra(milisegundos[0])
    );

    anchoBarra.setValue(0); // Reiniciar la barra
    setCodigoEncriptado(codigoGenerado);
    setHoraGeneracion(new Date()); // Guardamos la hora de generación
    setTiempoRestante(60); // Inicializamos el tiempo restante a 60 segundos
  };

  // Calcular el ancho restante de la barra de progreso
  const anchoBarraRestante = anchoBarra.interpolate({
    inputRange: [0, 100],
    outputRange: ['100%', '0%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ingreso con código de acceso</Text>
      
      {codigoEncriptado && tiempoRestante > 0 && (
        <View style={styles.codigoContainer}>
          <Text style={styles.codigoTexto}>Código actual: {codigoEncriptado}</Text>
          
          {/* Contador grande y animado */}
          <Text style={[styles.contador, { color: obtenerColorTiempo() }]}>
            {tiempoRestante}
          </Text>
          
          <Text style={styles.tiempoTexto}>
            {tiempoRestante === 1 ? 'segundo restante' : 'segundos restantes'}
          </Text>
          
          {/* Barra de progreso */}
          <View style={styles.barraContenedor}>
            <Animated.View 
              style={[
                styles.barraProgreso, 
                { 
                  width: anchoBarraRestante,
                  backgroundColor: obtenerColorTiempo()
                }
              ]} 
            />
          </View>
        </View>
      )}
      
      {codigoExpirado && (
        <View style={styles.mensajeExpirado}>
          <Text style={styles.textoExpirado}>El código ha expirado</Text>
          <Text>Por favor, genere un nuevo código</Text>
        </View>
      )}
      
      <TextInput
        style={[
          styles.input,
          codigoExpirado && styles.inputDeshabilitado
        ]}
        placeholder="Introduce el código"
        value={codigo}
        onChangeText={setCodigo}
        editable={!codigoExpirado} // Deshabilitar si expiró
      />
      
      <View style={styles.botonesContainer}>
        <Button 
          title="Ingresar" 
          onPress={validarCodigo}
          disabled={codigoExpirado || tiempoRestante === 0} // Deshabilitar si expiró
        />
        <Button 
          title="Generar Código" 
          onPress={generarCodigo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  codigoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  codigoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tiempoTexto: {
    fontSize: 16,
    color: '#e74c3c',
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 15,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  contador: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  barraContenedor: {
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  barraProgreso: {
    height: '100%',
  },
  inputDeshabilitado: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  mensajeExpirado: {
    backgroundColor: '#ffeeee',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  textoExpirado: {
    color: '#e74c3c',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  }
});
