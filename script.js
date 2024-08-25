// Import Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkwC7X34uMn1zgXUzosQql4UFDmDM_AbE",
    authDomain: "ilgrupeliga.firebaseapp.com",
    projectId: "ilgrupeliga",
    storageBucket: "ilgrupeliga.appspot.com",
    messagingSenderId: "727676932830",
    appId: "1:727676932830:android:d6eee6f570037dd774684f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic email format validation (not strictly required)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('error-message').textContent = 'Please enter a valid email address.';
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successful login
            window.location.href = 'home.html';  // Redirect to another page
        })
        .catch((error) => {
            // Handle errors
            const errorMessage = error.message;
            document.getElementById('error-message').textContent = errorMessage;
        });
});
