import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { 
  generarCodigoSincronizado, 
  calcularTiempoRestante, 
  formatearTiempoRestante, 
  obtenerColorTiempo 
} from './utils';

export default function CodeScreen({ navigation }) {
  const [codigoEncriptado, setCodigoEncriptado] = useState('');
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [anchoBarra] = useState(new Animated.Value(0));

  // Este useEffect se ejecuta al montar el componente y cada vez que pase un intervalo
  useEffect(() => {
    // Configurar la animación y actualizar el código inicialmente
    const iniciarCiclo = () => {
      const segundosRestantes = calcularTiempoRestante();
      setTiempoRestante(segundosRestantes);
      setCodigoEncriptado(generarCodigoSincronizado());
      
      // Configurar la animación para la barra de progreso
      anchoBarra.setValue(0);
      Animated.timing(anchoBarra, {
        toValue: 100,
        duration: segundosRestantes * 1000,
        useNativeDriver: false,
      }).start();
    };
    
    // Iniciar el ciclo inmediatamente
    iniciarCiclo();
    
    // Actualizar el tiempo restante cada segundo
    const intervaloTiempo = setInterval(() => {
      setTiempoRestante(prevTime => {
        if (prevTime <= 1) {
          // Cuando llegamos a cero, generar nuevo código
          iniciarCiclo();
          return calcularTiempoRestante();
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Limpiar intervalos cuando el componente se desmonte
    return () => {
      clearInterval(intervaloTiempo);
    };
  }, []);

  // Calcular el ancho restante de la barra de progreso
  const anchoBarraRestante = anchoBarra.interpolate({
    inputRange: [0, 100],
    outputRange: ['100%', '0%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Código de Acceso</Text>
      
      <View style={styles.codigoContainer}>
        <Text style={styles.labelCodigo}>Código actual:</Text>
        <Text style={styles.codigoTexto}>{codigoEncriptado}</Text>
        
        <Text style={styles.labelTiempo}>Válido por:</Text>
        <Text style={[styles.tiempoTexto, { color: obtenerColorTiempo(tiempoRestante) }]}>
          {formatearTiempoRestante(tiempoRestante)}
        </Text>
        
        <Text style={styles.infoActualizacion}>
          Se actualiza automáticamente cada 10 minutos
        </Text>
        
        <View style={styles.barraContenedor}>
          <Animated.View 
            style={[
              styles.barraProgreso, 
              { 
                width: anchoBarraRestante,
                backgroundColor: obtenerColorTiempo(tiempoRestante)
              }
            ]} 
          />
        </View>
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2c3e50',
    textAlign: 'center',
  },
  codigoContainer: {
    backgroundColor: '#f5f7fa',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  labelCodigo: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  codigoTexto: {
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 5,
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  labelTiempo: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  tiempoTexto: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoActualizacion: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  barraContenedor: {
    width: '100%',
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 10,
  },
  barraProgreso: {
    height: '100%',
  },
  infoContainer: {
    backgroundColor: '#eef2f7',
    borderRadius: 8,
    padding: 15,
    width: '100%',
  },
  infoTexto: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 10,
  }
});
