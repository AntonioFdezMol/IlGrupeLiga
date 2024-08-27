// Importar Firebase y Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

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
const auth = getAuth(app);
const db = getFirestore(app);

// Manejar el formulario de login
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value + '@midominio.com';
    const password = document.getElementById('password').value;

    try {
        // Paso 1: Autenticación con Firebase Authentication
        await signInWithEmailAndPassword(auth, email, password);

        // Paso 2: Verificación de credenciales en Firestore
        await authenticateUser(email.split('@')[0], password);

        // Redirigir a otra página
        window.location.href = 'pronosticos.html';  
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
    }
});

// Función para autenticar al usuario en Firestore
async function authenticateUser(username, password) {
    try {
        const usersRef = collection(db, 'USERS');
        const q = query(usersRef, where('NAME', '==', username), where('PASSWORD', '==', password));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();

            // Establecer el usuario y la competición en el almacenamiento local
            establecerUsuario(userDoc);
            establecerCompeticion();

            // Mostrar alerta de login correcto con el nombre del usuario
            alert(`Login correcto. Bienvenido, ${userDoc.NAME}!`);
        } else {
            throw new Error('Credenciales incorrectas');
        }
    } catch (error) {
        throw new Error('Error al autenticar: ' + error.message);
    }
}

// Función para establecer el usuario en el almacenamiento local
function establecerUsuario(userDoc) {
    const usuario = {
        NAME: userDoc.NAME,
        PERFIL: userDoc.PERFIL,
        UUID: userDoc.UUID
        // No guardamos la contraseña en localStorage por seguridad
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
}

// Función para establecer la competición en el almacenamiento local
function establecerCompeticion() {
    const competicion = {
        id: "FzgqkrrdJ0bmYXwX0Bpg",
        codigo: "LIGA24",
        nombre: "Liga 2024",
        fecha: "2024-07-14"  // Fecha en formato ISO
    };

    localStorage.setItem('competicion', JSON.stringify(competicion));
}
