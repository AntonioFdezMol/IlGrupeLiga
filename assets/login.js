import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

    const firebaseConfig = {
        apiKey: "AIzaSyCkwC7X34uMn1zgXUzosQql4UFDmDM_AbE",
        authDomain: "ilgrupeliga.firebaseapp.com",
        projectId: "ilgrupeliga",
        storageBucket: "ilgrupeliga.appspot.com",
        messagingSenderId: "727676932830",
        appId: "1:727676932830:android:d6eee6f570037dd774684f"
    };

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore(app);

      document.getElementById('login-form').addEventListener('submit', async function(event) {
          event.preventDefault();

          const email = document.getElementById('email').value + '@midominio.com';
          const password = document.getElementById('password').value;

          try {
              // Perform sign-in
              const userCredential = await signInWithEmailAndPassword(auth, email, password);

              // Authenticate user in Firestore
              await authenticateUser(email, password);

              // Redirect to another page
              window.location.href = 'pronosticos.html';  
          } catch (error) {
              document.getElementById('error-message').textContent = error.message;
          }
      });

      async function authenticateUser(email, password) {
          // Extract username from email
          const username = email.split('@')[0];
          
          // Query Firestore collection "USERS"
          const usersRef = collection(db, 'USERS');
          const q = query(usersRef, where('NAME', '==', username), where('PASSWORD', '==', password));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
              // Handle successful authentication
              const doc = querySnapshot.docs[0].data();

            // Establecer el usuario en el almacenamiento local
            establecerUsuario(doc);
              
            // Establece la competición en el almacenamiento local
            establecerCompeticion();

              // Recuperar el nombre del usuario de localStorage
            const usuario = JSON.parse(localStorage.getItem('usuario'));

            // Mostrar alerta de login correcto con el nombre del usuario
            alert(`Login correcto. Bienvenido, ${usuario.NAME}!`);
              
              // Do something with user data (e.g., store it globally, etc.)
              console.log('User authenticated:', doc);
              
              // Optional: set additional data or global state
              // setUser(doc);
          } else {
              throw new Error('Credenciales incorrectas');
          }
      }

    function establecerUsuario(userDoc) {
        // Crear un objeto de usuario basado en la estructura de Usuario
        const usuario = {
            NAME: userDoc.NAME,
            PERFIL: userDoc.PERFIL,
            UUID: userDoc.UUID
            // No guardamos la contraseña en localStorage por seguridad
        };
        
        // Guardar el objeto de usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

     function establecerCompeticion() {
        const competicion = {
            id: "FzgqkrrdJ0bmYXwX0Bpg",
            codigo: "LIGA24",
            nombre: "Liga 2024",
            fecha: "2024-07-14"  // Fecha en formato ISO
        };
        // Guardar la competición en localStorage
        localStorage.setItem('competicion', JSON.stringify(competicion));
    }
