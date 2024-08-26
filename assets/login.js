// Import Firebase libraries using the correct CDN for modular approach
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkwC7X34uMn1zgXUzosQql4UFDmDM_AbE",
    authDomain: "ilgrupeliga.firebaseapp.com",
    projectId: "ilgrupeliga",
    storageBucket: "ilgrupeliga.appspot.com",
    messagingSenderId: "727676932830",
    appId: "1:727676932830:android:d6eee6f570037dd774684f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle login form submission
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim() + '@midominio.com';
        const password = document.getElementById('password').value;

        try {
            // Perform sign-in
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to home page
            window.location.href = 'home.html';
        } catch (error) {
            // Handle errors
            document.getElementById('error-message').textContent = error.message;
        }
    });
}
