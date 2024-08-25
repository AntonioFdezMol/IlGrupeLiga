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

// Handle home page functionality
if (document.getElementById('card-container')) {
    const volumeIcon = document.getElementById('volume-icon');
    const saveButton = document.getElementById('saveButton');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const cardContainer = document.getElementById('card-container');
    
    let isMuted = false;

    // Initialize
    loadPronosticos();

    // Handle click on volume button
    document.getElementById('volume-toggle').addEventListener('click', () => {
        isMuted = !isMuted;
        volumeIcon.src = isMuted ? 'assets/images/silencio.png' : 'assets/images/sonido.png';
    });

    // Load pronósticos
    async function loadPronosticos() {
        showLoading();

        try {
            const pronosticosRef = collection(db, 'PRONOSTICOS');  // Replace with your actual collection
            const q = query(pronosticosRef);
            const querySnapshot = await getDocs(q);

            const pronosticos = querySnapshot.docs.map(doc => doc.data());
            renderCards(pronosticos);
        } catch (error) {
            console.error('Error loading pronósticos:', error);
        } finally {
            hideLoading();
        }
    }

    // Render cards
    function renderCards(pronosticos) {
        cardContainer.innerHTML = '';
        pronosticos.forEach(pronostico => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${pronostico.equipo1} vs ${pronostico.equipo2}</h3>
                <label>Goles ${pronostico.equipo1}: <input type="number" value="${pronostico.goles1}" /></label><br>
                <label>Goles ${pronostico.equipo2}: <input type="number" value="${pronostico.goles2}" /></label><br>
            `;
            cardContainer.appendChild(card);
        });
        saveButton.classList.remove('hidden');
    }

    // Show loading overlay
    function showLoading() {
        loadingOverlay.classList.remove('hidden');
    }

    // Hide loading overlay
    function hideLoading() {
        loadingOverlay.classList
