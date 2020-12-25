
  import firebase from 'firebase';
  // Initialize Firebase
  const config = {
    apiKey: YOUR_API_KEY,
    authDomain: YOUR_AUTH_DOMAIN,
    databaseURL: YOUR_DATABASE_URL,
    projectId: YOUR_PROJECT_ID,
    storageBucket: '',
    messagingSenderId: YOUR_MESSAGING_SENDER_ID,
  };
  firebase.initializeApp(config);
  const databaseRef = firebase.database().ref();
  const notesRef = databaseRef.child("notes");
  export default notesRef;