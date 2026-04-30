// src/services/evaluacionesService.js
// Servicio para operaciones CRUD de Evaluaciones en Firestore
// Incluye validaciones y manejo de errores para cumplir con requisitos de seguridad

import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase.js';

const COLLECTION_NAME = 'evaluaciones';

/**
 * VALIDACIÓN: Verifica que los datos del candidato sean válidos
 * Previene inyección de datos maliciosos y asegura integridad
 */
const validarDatosCandidato = (nombre, calificacion) => {
  // Validación de tipo de dato: nombre debe ser string no vacío
  if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
    throw new Error('El nombre es requerido y debe ser texto válido');
  }

  // Validación de longitud: evita nombres excesivamente largos
  if (nombre.length > 100) {
    throw new Error('El nombre no puede exceder 100 caracteres');
  }

  // Validación de tipo de dato: calificación debe ser numérica
  const calificacionNum = parseFloat(calificacion);
  if (isNaN(calificacionNum)) {
    throw new Error('La calificación debe ser un número válido');
  }

  // Validación de rango: calificación entre 0 y 100
  if (calificacionNum < 0 || calificacionNum > 100) {
    throw new Error('La calificación debe estar entre 0 y 100');
  }

  return { 
    nombreValido: nombre.trim(), 
    calificacionValida: calificacionNum 
  };
};

/**
 * CREATE - Agregar un nuevo candidato evaluado
 * @param {string} nombre - Nombre del candidato
 * @param {number} calificacion - Calificación obtenida (0-100)
 * @returns {Promise<string>} ID del documento creado
 */
export const agregarEvaluacion = async (nombre, calificacion) => {
  try {
    // SEGURIDAD: Validación de datos antes de guardar
    const { nombreValido, calificacionValida } = validarDatosCandidato(nombre, calificacion);

    const evaluacion = {
      nombre: nombreValido,
      calificacion: calificacionValida,
      fecha: Timestamp.now(), // Timestamp de Firebase para consistencia
      actualizado: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), evaluacion);
    console.log('✅ Evaluación creada con ID:', docRef.id);
    return docRef.id;

  } catch (error) {
    console.error('❌ Error al agregar evaluación:', error.message);
    throw error; // Propagar error para manejo en UI
  }
};

/**
 * READ - Obtener todas las evaluaciones
 * @returns {Promise<Array>} Lista de evaluaciones ordenadas por fecha
 */
export const obtenerEvaluaciones = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('fecha', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const evaluaciones = [];
    querySnapshot.forEach((doc) => {
      evaluaciones.push({
        id: doc.id,
        ...doc.data(),
        // Convertir Timestamp a Date para facilitar visualización
        fecha: doc.data().fecha?.toDate(),
        actualizado: doc.data().actualizado?.toDate()
      });
    });

    console.log(`✅ Se obtuvieron ${evaluaciones.length} evaluaciones`);
    return evaluaciones;

  } catch (error) {
    console.error('❌ Error al obtener evaluaciones:', error.message);
    throw error;
  }
};

/**
 * READ - Obtener una evaluación específica por ID
 * @param {string} id - ID del documento
 * @returns {Promise<Object>} Datos de la evaluación
 */
export const obtenerEvaluacionPorId = async (id) => {
  try {
    // SEGURIDAD: Validación de ID
    if (!id || typeof id !== 'string') {
      throw new Error('ID inválido');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Evaluación no encontrada');
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
      fecha: docSnap.data().fecha?.toDate(),
      actualizado: docSnap.data().actualizado?.toDate()
    };

  } catch (error) {
    console.error('❌ Error al obtener evaluación:', error.message);
    throw error;
  }
};

/**
 * UPDATE - Actualizar calificación de un candidato
 * @param {string} id - ID del documento
 * @param {string} nombre - Nuevo nombre (opcional)
 * @param {number} calificacion - Nueva calificación
 * @returns {Promise<void>}
 */
export const actualizarEvaluacion = async (id, nombre, calificacion) => {
  try {
    // SEGURIDAD: Validación de ID
    if (!id || typeof id !== 'string') {
      throw new Error('ID inválido');
    }

    // SEGURIDAD: Validación de datos
    const { nombreValido, calificacionValida } = validarDatosCandidato(nombre, calificacion);

    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      nombre: nombreValido,
      calificacion: calificacionValida,
      actualizado: Timestamp.now() // Registro de última actualización
    });

    console.log('✅ Evaluación actualizada:', id);

  } catch (error) {
    console.error('❌ Error al actualizar evaluación:', error.message);
    throw error;
  }
};

/**
 * DELETE - Eliminar una evaluación
 * @param {string} id - ID del documento
 * @returns {Promise<void>}
 */
export const eliminarEvaluacion = async (id) => {
  try {
    // SEGURIDAD: Validación de ID
    if (!id || typeof id !== 'string') {
      throw new Error('ID inválido');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    console.log('✅ Evaluación eliminada:', id);

  } catch (error) {
    console.error('❌ Error al eliminar evaluación:', error.message);
    throw error;
  }
};
