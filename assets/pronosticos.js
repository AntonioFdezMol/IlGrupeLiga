// Importar Firebase y Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, query, where, getDocs, Timestamp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCkwC7X34uMn1zgXUzosQql4UFDmDM_AbE",
    authDomain: "ilgrupeliga.firebaseapp.com",
    projectId: "ilgrupeliga",
    storageBucket: "ilgrupeliga.appspot.com",
    messagingSenderId: "727676932830",
    appId: "1:727676932830:android:d6eee6f570037dd774684f"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

async function recuperarPronosticosYMontarTarjetas() {
    try {
        // Obtener la fecha actual en formato timestamp
        const currentTimestamp = Timestamp.now();
        
        // Obtener la competición y el usuario desde el almacenamiento local
        const competicionId = JSON.parse(localStorage.getItem('competicion')).id;
        const UUIDUser = JSON.parse(localStorage.getItem('usuario')).UUID;

        // Crear consultas
        const partidosQuery = query(
            collection(db, 'PLANTILLA_PARTIDO'),
            where('DATE_PARTIDO', '>', currentTimestamp),
            where('ESTADO', '==', 'PENDIENTE'),
            where('COMPETICION_ID', '==', competicionId)
        );

        const pronosticosQuery = query(
            collection(db, 'PRONOSTICO'),
            where('USER_ID', '==', UUIDUser),
            where('DATE_PARTIDO', '>', currentTimestamp),
            where('ESTADO', '==', 'PENDIENTE'),
            where('COMPETICION_ID', '==', competicionId)
        );

        // Obtener datos de ambas consultas
        const [partidosSnapshot, pronosticosSnapshot] = await Promise.all([
            getDocs(partidosQuery),
            getDocs(pronosticosQuery)
        ]);

        // Procesar los resultados de la primera consulta
        const plantillaPartidoList = partidosSnapshot.docs.map(doc => doc.data());

        // Procesar los resultados de la segunda consulta
        const pronosticoList = pronosticosSnapshot.docs.map(doc => doc.data());

        // Hacer una copia de la lista de pronósticos
        const pronosticosOrigenList = pronosticoList ? JSON.parse(JSON.stringify(pronosticoList)) : [];

        // Mostrar alerta
        alert(`Se han recuperado ${plantillaPartidoList.length} plantillas y ${pronosticoList.length} pronósticos.`);
        
        // Llamar a la función que procesará ambos conjuntos de datos
        // onAllDataLoaded();

    } catch (error) {
        console.error("Error getting documents.", error);
        // Ocultar el spinner de carga en caso de error
        hideLoading();
    }
}

// Función para ocultar el spinner de carga
function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

// Ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    recuperarPronosticosYMontarTarjetas();
});
