// Funciones compartidas para generación y validación de códigos

/**
 * Genera un código único basado en la hora actual, redondeada a intervalos de 10 segundos
 * @returns {string} Código de 5 letras
 */
export const generarCodigoSincronizado = () => {
  const ahora = new Date();
  
  // Redondear a los 10 segundos más cercanos (hacia abajo)
  const segundoRedondeado = Math.floor(ahora.getSeconds() / 10) * 10;
  const horaBase = new Date(
    ahora.getFullYear(),
    ahora.getMonth(),
    ahora.getDate(),
    ahora.getHours(),
    ahora.getMinutes(),
    segundoRedondeado
  );
  
  // Usar la horaBase para crear un código determinístico
  const horaStr = horaBase.getHours().toString().padStart(2, '0');
  const minutoStr = horaBase.getMinutes().toString().padStart(2, '0');
  const segundoStr = horaBase.getSeconds().toString().padStart(2, '0');
  
  // Crear una semilla consistente basada en la hora
  const semilla = parseInt(horaStr + minutoStr + segundoStr, 10);
  
  // Generar el código usando la semilla
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let codigo = '';
  
  // Usar un algoritmo pseudo-aleatorio pero determinístico
  for (let i = 0; i < 5; i++) {
    // Tomamos diferentes valores de la semilla para cada carácter
    const valorSemilla = (semilla * (i + 1) * 7919) % 26; // 7919 es un número primo para mejorar la distribución
    codigo += letras.charAt(valorSemilla);
  }
  
  return codigo;
};

/**
 * Calcula los segundos restantes hasta el próximo intervalo de 10 segundos
 * @returns {number} Segundos restantes
 */
export const calcularTiempoRestante = () => {
  const ahora = new Date();
  const segundos = ahora.getSeconds();
  const milisegundos = ahora.getMilliseconds();
  
  // Calcular segundos restantes hasta el próximo intervalo de 10 segundos
  const segundosHastaProximoIntervalo = 9 - (segundos % 10);
  const segundosRestantes = segundosHastaProximoIntervalo + (1 - milisegundos / 1000);
  
  return Math.round(segundosRestantes);
};

/**
 * Formatea el tiempo restante en formato segundos.milisegundos
 * @param {number} segundos - Tiempo en segundos
 * @returns {string} Tiempo formateado como "s.ms"
 */
export const formatearTiempoRestante = (segundos) => {
  // Para un intervalo de 10 segundos, mostramos simplemente los segundos
  return `${segundos}s`;
};

/**
 * Determina el color según el tiempo restante
 * @param {number} segundos - Tiempo restante en segundos
 * @returns {string} Código de color en formato hex
 */
export const obtenerColorTiempo = (segundos) => {
  const porcentajeRestante = (segundos / 10) * 100;
  if (porcentajeRestante > 50) return '#27ae60'; // Verde
  if (porcentajeRestante > 20) return '#f39c12'; // Amarillo/naranja
  return '#e74c3c'; // Rojo
};