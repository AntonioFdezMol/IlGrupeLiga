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
    
    let email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Add "@midominio.com" to the email if it doesn't already include "@".
    if (!email.includes('@')) {
        email += '@midominio.com';
    }

    // Attempt to sign in with the email and password
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
